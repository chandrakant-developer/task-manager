const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateUserId, generateAccessToken, generateRefreshToken } = require('../utils');
const { mapUser } = require("../mappers/user.mapper");
const { SALT_ROUNDS, REFRESH_TOKEN_EXPIRY } = require("../config/auth.config");
const User = require("../models/user.model");
const Session = require("../models/session.model");
const { ERRORS } = require("../constants");

exports.registerUser = async ({ name, email, password }) => {
    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error(ERRORS.AUTH_ERRORS.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await generateUserId();

    const user = await User.create({
        userId,
        name,
        email,
        password: hashedPassword
    });

    return mapUser(user);
};

exports.loginUser = async (email, password, ipAddress, device) => {
    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await Session.create({
        userId: user.userId,
        refreshToken,
        device,
        ipAddress,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY)
    });

    return {
        accessToken,
        refreshToken,
        user: mapUser(user)
    };
};

exports.refreshToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error(ERRORS.AUTH_ERRORS.TOKEN_MISSING);
    }

    const session = await Session.findOne({ refreshToken });

    if (!session) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_SESSION);
    }

    if (session.expiresAt < new Date()) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_SESSION);
    }

    let decoded;

    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
    } catch (error) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_SESSION);
    }

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_SESSION);
    }

    const newAccessToken = generateAccessToken(user);

    return {
        accessToken: newAccessToken
    };
};

exports.logoutUser = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error(ERRORS.AUTH_ERRORS.TOKEN_MISSING);
    }

    const result = await Session.deleteOne({ refreshToken });

    if (result.deletedCount === 0) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_SESSION);
    }

    return true;
};