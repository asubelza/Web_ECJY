const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.get('/stats', protect, userController.getDashboardStats);

router.get('/', protect, authorize('admin'), userController.getAllUsers);

router.get('/:id', protect, authorize('admin'), userController.getUserById);

router.put('/:id', protect, authorize('admin'), [
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('role').optional().isIn(['admin', 'user']),
  validate
], userController.updateUser);

router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router;
