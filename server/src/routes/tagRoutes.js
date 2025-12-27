const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

// GET all tags
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
    
    const tags = await Tag.find(query).sort({ isDefault: -1, name: 1 });
    res.json(tags);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching tags', error: error.message });
  }
});

// POST create new tag
router.post('/', async (req, res) => {
  try {
    const { name, userId } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Tag name is required' });
    }
    
    const existingTag = await Tag.findOne({
      name: name.trim(),
      userId: userId || null,
    });
    
    if (existingTag) {
      return res.status(409).json({ message: 'Tag already exists' });
    }
    
    const newTag = await Tag.create({
      name: name.trim(),
      userId: userId || null,
      isDefault: false,
    });
    
    res.status(201).json(newTag);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Tag already exists' });
    }
    res
      .status(500)
      .json({ message: 'Error creating tag', error: error.message });
  }
});

// DELETE tag
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    
    const tag = await Tag.findById(id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    if (tag.isDefault) {
      return res.status(403).json({ message: 'Cannot delete default tag' });
    }
    
    if (tag.userId && tag.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    await Tag.findByIdAndDelete(id);
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting tag', error: error.message });
  }
});

module.exports = router;
