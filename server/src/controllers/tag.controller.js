const tagService = require('../services/tag.service');
const { ERRORS } = require("../constants");

exports.getTags = async (req, res) => {
    try {
        const { role, userId } = req.user;

        const tags = await tagService.getTags(role, userId);

        res.status(200).json({
            success: true,
            message: "Tags fetched successfully",
            count: tags.length,
            data: tags,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tags',
            error: error.message
        });
    }
};

exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const { userId } = req.user;

        const newTag = await tagService.createTag(name, userId);

        res.status(201).json({
            success: true,
            message: "Tag created successfully",
            data: newTag
        });
    } catch (error) {
        if (error.message === ERRORS.TAG_ERRORS.TAG_EXISTS) {
            return res.status(409).json({
                success: false,
                message: 'Tag already exists',
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating tag',
            error: error.message
        });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        
        await tagService.deleteTag(id, userId);
        
        res.status(200).json({
            success: true,
            message: "Tag deleted successfully"
        });
    } catch (error) {
        if (error.message === ERRORS.TAG_ERRORS.TAG_NOT_FOUND) {
            return res.status(404).json({
                success: false,
                message: "Tag not found",
                error: error.message
            });
        }

        if (error.message === ERRORS.TAG_ERRORS.DEFAULT_TAG) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete default tag",
                error: error.message
            });
        }

        if (error.message === ERRORS.TAG_ERRORS.UNAUTHORIZED) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
                error: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Error deleting tag",
            error: error.message
        });
    }
};