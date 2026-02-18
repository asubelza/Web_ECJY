const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.post('/', [
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('message').trim().notEmpty().withMessage('El mensaje es requerido'),
  validate
], contactController.createContact);

router.get('/', protect, authorize('admin'), contactController.getContacts);

router.patch('/:id', protect, authorize('admin'), contactController.updateContactStatus);

module.exports = router;
