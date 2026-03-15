const express = require('express');
const router = express.Router();
const listController = require('../controllers/list.controller');
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get('/', listController.getLists);

router.post('/', listController.createList);

router.delete('/:id', listController.deleteList);

module.exports = router;