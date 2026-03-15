const authService = require("../services/auth.service");
const ERRORS = require('../utils/errorCodes');

exports.registerUser = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            data: user
        });

    } catch (error) {
        if (error.message === ERRORS.AUTH_ERRORS.EMAIL_EXISTS) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });

    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.loginUser(email, password, req);

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.json({
            message: "Login successful",
            user: data.user
        });
    } catch (error) {
        if (error.message === ERRORS.AUTH_ERRORS.INVALID_CREDENTIALS) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const data = await authService.refreshToken(refreshToken);

        res.cookie("accessToken", data.accessToken, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.json({
            message: "Access token refreshed"
        });
    } catch (error) {
        res.status(401).json({
            message: "Invalid refresh token"
        });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        await authService.logoutUser(refreshToken);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging out"
        });
    }
};