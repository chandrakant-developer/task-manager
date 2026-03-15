const todoService = require("../services/todo.service");
const ERRORS = require("../utils/errorCodes");

exports.getTodos = async (req, res) => {
  try {
    const { userId } = req.query;
    const todos = await todoService.getTodos(userId);
    res.json(todos);
  } catch (error) {
    if (error.message === ERRORS.TODO_ERRORS.TODO_NOT_FOUND) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    res.status(500).json({
      message: "Error fetching todos",
      error: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const todo = await todoService.getTodoById(id, userId);
    res.json(todo);

  } catch (error) {
    if (error.message === ERRORS.TODO_ERRORS.TODO_NOT_FOUND) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (error.message === ERRORS.TODO_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(500).json({
      message: "Error fetching todo",
      error: error.message,
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Error creating todo",
      error: error.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const updatedTodo = await todoService.updateTodo(id, userId, req.body);
    res.json(updatedTodo);
  } catch (error) {
    if (error.message === ERRORS.TODO_ERRORS.TODO_NOT_FOUND) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (error.message === ERRORS.TODO_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(500).json({
      message: "Error updating todo",
      error: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    await todoService.deleteTodo(id, userId);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    if (error.message === ERRORS.TODO_ERRORS.TODO_NOT_FOUND) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (error.message === ERRORS.TODO_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(500).json({
      message: "Error deleting todo",
      error: error.message,
    });
  }
};