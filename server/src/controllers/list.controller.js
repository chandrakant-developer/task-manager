const listService = require('../services/list.service');
const { ERRORS } = require("../constants");

exports.getLists = async (req, res) => {
  try {
    const { role, userId } = req.user;
    
    const lists = await listService.getLists(role, userId);

    res.status(200).json({
      success: true,
      message: "Lists fetched successfully",
      count: lists.length,
      data: lists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching lists",
      error: error.message
    });
  }
};

exports.createList = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;

    const newList = await listService.createList(name, userId);

    res.status(201).json({
      success: true,
      message: "List created successfully",
      data: newList
    });
  } catch (error) {
    if (error.message === ERRORS.LIST_ERRORS.LIST_EXISTS) {
      return res.status(409).json({
        success: false,
        message: "List already exists",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating list",
      error: error.message
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    await listService.deleteList(id, userId);

    res.status(200).json({
      success: true,
      message: "List deleted successfully"
    });
  } catch (error) {
    if (error.message === ERRORS.LIST_ERRORS.LIST_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "List not found",
        error: error.message
      });
    }

    if (error.message === ERRORS.LIST_ERRORS.DEFAULT_LIST) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete default list",
        error: error.message
      });
    }

    if (error.message === ERRORS.LIST_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting list",
      error: error.message
    });
  }
};