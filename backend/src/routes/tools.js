const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const toolController = require('../controllers/toolController');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.get('/', protect, toolController.getTools);

router.post('/', protect, authorize('admin'), [
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  validate
], toolController.createTool);

router.put('/:id', protect, authorize('admin'), toolController.updateTool);

router.delete('/:id', protect, authorize('admin'), toolController.deleteTool);

module.exports = router;
