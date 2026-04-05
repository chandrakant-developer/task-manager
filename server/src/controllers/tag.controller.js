const tagService = require('../services/tag.service');
const ERRORS = require("../utils/errorCodes");

exports.getTags = async (req, res) => {
    try {
        const { userId } = req.query;
        const tags = await tagService.getTags(userId);
        res.json({
            success: true,
            data: tags
        });
    } catch (error) {
        if (error.message === ERRORS.TAG_ERRORS.TAG_NOT_FOUND) {
            return res.status(404).json({
                message: "Tag not found",
                error: error.message
            });
        }

        res.status(500).json({
            message: 'Error fetching tags',
            error: error.message
        });
    }
};

exports.createTag = async (req, res) => {
    try {
        const { name, userId } = req.body;
        const newTag = await tagService.createTag(name, userId);
        res.status(201).json({
            message: "Tag created successfully",
            data: newTag
        });
    } catch (error) {
        if (error.message === ERRORS.TAG_ERRORS.TAG_EXISTS) {
            return res.status(409).json({
                message: 'Tag already exists',
                error: error.message
            });
        }

        res.status(500).json({
            message: 'Error creating tag',
            error: error.message
        });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        await tagService.deleteTag(id, userId);
        res.json({
            message: "Tag deleted successfully"
        });
    } catch (error) {
        if (error.message === ERRORS.TAG_ERRORS.TAG_NOT_FOUND) {
            return res.status(404).json({
                message: "Tag not found",
                error: error.message
            });
        }

        if (error.message === ERRORS.TAG_ERRORS.DEFAULT_TAG) {
            return res.status(403).json({
                message: "Cannot delete default tag",
                error: error.message
            });
        }

        if (error.message === ERRORS.TAG_ERRORS.UNAUTHORIZED) {
            return res.status(403).json({
                message: "Unauthorized",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Error deleting tag",
            error: error.message
        });
    }
};