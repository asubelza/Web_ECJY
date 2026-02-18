const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('../config/passport');
const authController = require('../controllers/authController');
const oauthController = require('../controllers/oauthController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// Rutas locales
router.post('/register', [
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  validate
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  validate
], authController.login);

router.get('/me', protect, authController.getMe);

// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/auth/error',
    session: false 
  }),
  oauthController.oauthCallback
);

// Facebook OAuth
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/api/auth/error',
    session: false 
  }),
  oauthController.oauthCallback
);

// Microsoft OAuth (Hotmail/Outlook)
router.get('/microsoft',
  passport.authenticate('microsoft', { 
    scope: ['user.read', 'email', 'profile', 'openid'] 
  })
);

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { 
    failureRedirect: '/api/auth/error',
    session: false 
  }),
  oauthController.oauthCallback
);

// Instagram OAuth
router.get('/instagram',
  passport.authenticate('instagram')
);

router.get('/instagram/callback',
  passport.authenticate('instagram', { 
    failureRedirect: '/api/auth/error',
    session: false 
  }),
  oauthController.oauthCallback
);

// Error OAuth
router.get('/error', oauthController.oauthError);

module.exports = router;
