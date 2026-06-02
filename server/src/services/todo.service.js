const mongoose = require("mongoose");
const Todo = require("../models/todo.model");
const { ERRORS } = require("../constants");

exports.getTodos = async (userId, filter) => {
  const query = { userId };
  const today = new Date().toLocaleDateString("en-CA");

  switch (filter) {
    case "all":
      break;

    case "today":
      query.completed = false;
      query.dueDate = today;
      break;

    case "upcoming":
      query.completed = false;
      query.dueDate = { $gt: today };
      break;

    case "completed":
      query.completed = true;
      break;

    case "starred":
      query.starred = true;
      break;

    default:
      break;
  }

  return await Todo.find(query).sort({ createdAt: -1 }).lean();
};

exports.getTodoById = async (id, userId) => {
  const todo = await Todo.findById(id).lean();

  if (!todo) {
    throw new Error(ERRORS.TODO_ERRORS.TODO_NOT_FOUND);
  }

  if (Number(todo.userId) !== Number(userId)) {
    throw new Error(ERRORS.TODO_ERRORS.UNAUTHORIZED);
  }

  return todo;
};

exports.getTodoCounts = async (userId) => {
  const today = new Date().toLocaleDateString("en-CA");

  const [
    allCount,
    todaysCount,
    upcomingCount,
    completedCount,
    starredCount
  ] = await Promise.all([
    Todo.countDocuments({
      userId
    }),
    Todo.countDocuments({
      userId,
      completed: false,
      dueDate: today
    }),
    Todo.countDocuments({
      userId,
      completed: false,
      dueDate: { $gt: today }
    }),
    Todo.countDocuments({
      userId,
      completed: true
    }),
    Todo.countDocuments({
      userId,
      starred: true
    })
  ]);

  return {
    all: allCount,
    today: todaysCount,
    upcoming: upcomingCount,
    completed: completedCount,
    starred: starredCount
  };
};

exports.createTodo = async (data, userId) => {
  const { title, description, list, dueDate, tags } = data;

  return await Todo.create({ title, description, list, dueDate, tags, userId });
};

exports.updateTodo = async (id, userId, data) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new Error(ERRORS.TODO_ERRORS.TODO_NOT_FOUND);
  }

  if (Number(todo.userId) !== Number(userId)) {
    throw new Error(ERRORS.TODO_ERRORS.UNAUTHORIZED);
  }

  const allowedFields = ["title", "description", "completed", "list", "tags"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new Error(ERRORS.TODO_ERRORS.NO_FIELDS_TO_UPDATE);
  }

  // const updatedTodo = await Todo.findByIdAndUpdate(id, updates, { new: true });

  Object.assign(todo, updates);

  await todo.save();

  return todo;
};

exports.deleteTodo = async (id, userId) => {
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new Error(ERRORS.TODO_ERRORS.TODO_NOT_FOUND);
  }

  if (Number(todo.userId) !== Number(userId)) {
    throw new Error(ERRORS.TODO_ERRORS.UNAUTHORIZED);
  }

  await todo.deleteOne();
};