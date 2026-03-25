const listService = require('../services/list.service');
const ERRORS = require("../utils/errorCodes");

exports.getLists = async (req, res) => {
  try {
    const { userId } = req.query;
    const lists = await listService.getLists(userId);
    res.json(lists);
  } catch (error) {
    if (error.message === ERRORS.LIST_ERRORS.LIST_NOT_FOUND) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(500).json({
      message: "Error fetching lists",
      error: error.message
    });
  }
};

exports.createList = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const newList = await listService.createList(name, userId);
    res.status(201).json(newList);
  } catch (error) {
    if (error.message === ERRORS.LIST_ERRORS.LIST_EXISTS) {
      return res.status(409).json({ message: "List already exists" });
    }

    res.status(500).json({
      message: "Error creating list",
      error: error.message
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    await listService.deleteList(id, userId);
    res.json({ message: "List deleted successfully" });
  } catch (error) {
    if (error.message === ERRORS.LIST_ERRORS.LIST_NOT_FOUND) {
      return res.status(404).json({ message: "List not found" });
    }

    if (error.message === ERRORS.LIST_ERRORS.DEFAULT_LIST) {
      return res.status(403).json({ message: "Cannot delete default list" });
    }

    if (error.message === ERRORS.LIST_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(500).json({
      message: "Error deleting list",
      error: error.message
    });
  }
};