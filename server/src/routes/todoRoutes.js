const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching todos', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching todo', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, list, dueDate, tags } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      list,
      dueDate,
      tags,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating todo', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, list, dueDate, tags } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, list, dueDate, tags },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating todo', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting todo', error: error.message });
  }
});

module.exports = router;
