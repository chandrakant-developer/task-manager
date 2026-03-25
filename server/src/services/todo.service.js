const mongoose = require("mongoose");
const Todo = require("../models/todo.model");
const ERRORS = require("../utils/errorCodes");

exports.getTodos = async (userId) => {
  userId = userId || null;

  const todo = await Todo.find({ userId }).sort({ createdAt: -1 });

  console.log(todo);

  if (todo.length === 0) {
    throw new Error(ERRORS.TODO_ERRORS.TODO_NOT_FOUND);
  }

  return todo;
};

exports.getTodoById = async (id, userId) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new Error(ERRORS.TODO_ERRORS.TODO_NOT_FOUND);
  }

  userId = userId || null;

  if (todo.userId !== userId) {
    throw new Error(ERRORS.TODO_ERRORS.UNAUTHORIZED);
  }

  return todo;
};

exports.createTodo = async (data) => {
  const { title, description, list, dueDate, tags, userId } = data;

  const newTodo = await Todo.create({
    title,
    description,
    list,
    dueDate,
    tags,
    userId,
  });

  return newTodo;
};

exports.updateTodo = async (id, userId, data) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new Error(ERRORS.TODO_ERRORS.TODO_NOT_FOUND);
  }

  userId = userId || null;

  if (todo.userId !== userId) {
    throw new Error(ERRORS.TODO_ERRORS.UNAUTHORIZED);
  }

  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTodo = async (id, userId) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new Error(ERRORS.TODO_ERRORS.TODO_NOT_FOUND);
  }

  userId = userId || null;

  if (todo.userId !== userId) {
    throw new Error(ERRORS.TODO_ERRORS.UNAUTHORIZED);
  }

  await Todo.findByIdAndDelete(id);
};