const todoService = require("../services/todo.service");
const { ERRORS } = require("../constants");

exports.getTodos = async (req, res) => {
  try {
    const { userId } = req.user;
    const { filter } = req.query;

    const todos = await todoService.getTodos(userId, filter);

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const todo = await todoService.getTodoById(id, userId);

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: todo
    });
  } catch (error) {
    if (error.message === ERRORS.TODO_ERRORS.TODO_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        error: error.message
      });
    }

    if (error.message === ERRORS.TODO_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching task",
      error: error.message
    });
  }
};

exports.getTodoCounts = async (req, res) => {
  try {
    const { userId } = req.user;

    const counts = await todoService.getTodoCounts(userId);

    res.status(200).json({
      success: true,
      message: "Task counts fetched successfully",
      data: counts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching task counts",
      error: error.message
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { userId } = req.user;
    const payload = req.body;

    const newTodo = await todoService.createTodo(payload, userId);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating task",
      error: error.message
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const payload = req.body;

    const updatedTodo = await todoService.updateTodo(id, userId, payload);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTodo
    });
  } catch (error) {
    if (error.message === ERRORS.TODO_ERRORS.NO_FIELDS_TO_UPDATE) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
        error: error.message
      });
    }
    
    if (error.message === ERRORS.TODO_ERRORS.TODO_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        error: error.message
      });
    }

    if (error.message === ERRORS.TODO_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    await todoService.deleteTodo(id, userId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    if (error.message === ERRORS.TODO_ERRORS.TODO_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        error: error.message
      });
    }

    if (error.message === ERRORS.TODO_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: error.message
    });
  }
};