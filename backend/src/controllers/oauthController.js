const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/auth');

// Generar token JWT para usuario OAuth
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: jwtExpire
  });
};

// Callback exitoso de OAuth
exports.oauthCallback = (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user);
    
    // Enviar token al frontend via URL
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
      avatar: user.avatar
    }))}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=oauth_failed`);
  }
};

// Error de OAuth
exports.oauthError = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=oauth_failed`);
};
