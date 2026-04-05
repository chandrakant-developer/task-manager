const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get('/', tagController.getTags);

router.post('/', tagController.createTag);

router.delete('/:id', tagController.deleteTag);

module.exports = router;