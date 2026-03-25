const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        refreshToken: {
            type: String,
            required: true
        },
        device: String,
        ipAddress: String,
        expiresAt: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Session", sessionSchema);