const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ERRORS = require('../utils/errorCodes');

const User = require("../models/user.model");
const Session = require("../models/session.model");

const generateUserId = require("../utils/generateUserId");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

exports.registerUser = async ({ name, email, password, phone }) => {
    email = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error(ERRORS.AUTH_ERRORS.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await generateUserId();

    const user = await User.create({
        userId,
        name,
        email,
        password: hashedPassword,
        phone
    });

    return {
        id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email
    };
};

exports.loginUser = async (email, password, req) => {
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
        userId: user._id,
        refreshToken,
        device: "web",
        ipAddress: req.ip,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
    });

    return {
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            userId: user.userId,
            name: user.name,
            email: user.email
        }
    };
};

exports.refreshToken = async (refreshToken) => {
    const session = await Session.findOne({ refreshToken });

    if (!session) {
        throw new Error(ERRORS.AUTH_ERRORS.INVALID_SESSION);
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);
    const newAccessToken = generateAccessToken(user);

    return {
        accessToken: newAccessToken
    };
};



exports.logoutUser = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError(ERRORS.AUTH_ERRORS.TOKEN_MISSING);
    }

    const deletedSession = await Session.deleteOne({ refreshToken });

    if (!deletedSession.deletedCount) {
        throw new AppError(ERRORS.AUTH_ERRORS.INVALID_SESSION);
    }

    return {
        message: "Logged out successfully"
    };
};