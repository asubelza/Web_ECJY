const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const specialistController = require('../controllers/specialistController');
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.get('/', specialistController.getSpecialists);

router.post('/', protect, authorize('admin'), [
  body('area').trim().notEmpty().withMessage('El área es requerida'),
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  validate
], specialistController.createSpecialist);

router.put('/:id', protect, authorize('admin'), specialistController.updateSpecialist);

router.delete('/:id', protect, authorize('admin'), specialistController.deleteSpecialist);

module.exports = router;
