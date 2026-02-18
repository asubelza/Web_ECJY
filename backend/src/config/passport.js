const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const User = require('../models/User');

// Serializar usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Helper para encontrar o crear usuario OAuth
const findOrCreateOAuthUser = async (profile, provider) => {
  try {
    // Buscar usuario por providerId
    let user = await User.findOne({
      provider: provider,
      providerId: profile.id
    });

    if (user) {
      return user;
    }

    // Buscar usuario por email
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    
    if (email) {
      user = await User.findOne({ email });
      if (user) {
        // Actualizar usuario existente con datos OAuth
        user.provider = provider;
        user.providerId = profile.id;
        if (profile.photos && profile.photos[0]) {
          user.avatar = profile.photos[0].value;
        }
        await user.save();
        return user;
      }
    }

    // Crear nuevo usuario
    const name = profile.displayName || 
                 (profile.name ? `${profile.name.givenName || ''} ${profile.name.familyName || ''}`.trim() : '') ||
                 email?.split('@')[0] || 
                 'Usuario';

    user = await User.create({
      name: name,
      email: email || `${provider}_${profile.id}@placeholder.com`,
      provider: provider,
      providerId: profile.id,
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateOAuthUser(profile, 'google');
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name', 'photos', 'displayName']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateOAuthUser(profile, 'facebook');
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// Microsoft Strategy (Hotmail/Outlook)
if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
  passport.use(
    new MicrosoftStrategy(
      {
        clientID: process.env.MICROSOFT_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
        callbackURL: '/api/auth/microsoft/callback',
        scope: ['user.read', 'email', 'profile']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateOAuthUser(profile, 'microsoft');
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// Instagram Strategy
if (process.env.INSTAGRAM_CLIENT_ID && process.env.INSTAGRAM_CLIENT_SECRET) {
  passport.use(
    new InstagramStrategy(
      {
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        callbackURL: '/api/auth/instagram/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateOAuthUser(profile, 'instagram');
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

module.exports = passport;
