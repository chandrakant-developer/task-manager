const express = require('express');
const router = express.Router();
const List = require('../models/List');

// GET all lists
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    
    let query = {};
    if (userId) {
      query = {
        $or: [{ userId: null }, { userId: userId }],
      };
    } else {
      query = { userId: null };
    }
    
    const lists = await List.find(query).sort({ isDefault: -1, name: 1 });
    res.json(lists);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching lists', error: error.message });
  }
});

// POST create new list
router.post('/', async (req, res) => {
  try {
    const { name, userId } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'List name is required' });
    }
    
    const existingList = await List.findOne({
      name: name.trim(),
      userId: userId || null,
    });
    
    if (existingList) {
      return res.status(409).json({ message: 'List already exists' });
    }
    
    const newList = await List.create({
      name: name.trim(),
      userId: userId || null,
      isDefault: false,
    });
    
    res.status(201).json(newList);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'List already exists' });
    }
    res
      .status(500)
      .json({ message: 'Error creating list', error: error.message });
  }
});

// DELETE list
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    
    const list = await List.findById(id);
    
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    
    if (list.isDefault) {
      return res.status(403).json({ message: 'Cannot delete default list' });
    }
    
    if (list.userId && list.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    await List.findByIdAndDelete(id);
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting list', error: error.message });
  }
});

module.exports = router;
