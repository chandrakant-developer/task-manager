const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type:String,
            default: null,
        },
        isDefault: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

listSchema.index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('List', listSchema);
