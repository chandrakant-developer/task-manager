const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/", todoController.getTodos);

router.get("/counts", todoController.getTodoCounts);

router.get("/:id", todoController.getTodoById);

router.post("/", todoController.createTodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);

module.exports = router;