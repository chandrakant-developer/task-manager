const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;    
            
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);

        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};