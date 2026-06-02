const authService = require("../services/auth.service");
const { cookieOptions } = require("../config/cookie.config");
const { ERRORS } = require('../constants');
const { REFRESH_TOKEN_EXPIRY } = require("../config/auth.config");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const response = await authService.registerUser({ name, email, password });
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: response
        }); 
    } catch (error) {
        if (error.message === ERRORS.AUTH_ERRORS.EMAIL_EXISTS) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ipAddress = req.ip;
        const device = req.headers["user-agent"];

        const response = await authService.loginUser(email, password, ipAddress, device);

        res.cookie("accessToken", response.accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", response.refreshToken, {
            ...cookieOptions,
            maxAge: REFRESH_TOKEN_EXPIRY
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: response.user
        });
    } catch (error) {
        if (error.message === ERRORS.AUTH_ERRORS.INVALID_CREDENTIALS) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        const response = await authService.refreshToken(refreshToken);

        res.cookie("accessToken", response.accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Access token refreshed"
        });
    } catch (error) {
        if (error.message === ERRORS.AUTH_ERRORS.TOKEN_MISSING) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is missing",
                error: error.message
            });
        }

        if (error.message === ERRORS.AUTH_ERRORS.INVALID_SESSION) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Error refreshing token",
            error: error.message
        });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        await authService.logoutUser(refreshToken);

        res.clearCookie("accessToken", {
            ...cookieOptions
        });

        res.clearCookie("refreshToken", {
            ...cookieOptions
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        if (error.message === ERRORS.AUTH_ERRORS.TOKEN_MISSING) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is missing",
                error: error.message
            });
        }

        if (error.message === ERRORS.AUTH_ERRORS.INVALID_SESSION) {
            return res.status(401).json({
                success: false,
                message: "No active session found",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Error logging out",
            error: error.message
        });
    }
};