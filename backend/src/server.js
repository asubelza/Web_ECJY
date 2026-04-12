require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const connectDB = require('./config/database');
const passport = require('./config/passport');
const User = require('./models/User');
const Specialist = require('./models/Specialist');
const Tool = require('./models/Tool');

const app = express();

// Trust proxy for rate limit behind nginx
app.set('trust proxy', 1);

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Demasiadas solicitudes, intenta más tarde'
});
app.use('/api/', limiter);

// Security: Helmet headers
app.use(helmet());

// Security: CORS - solo permitir Production domain
const allowedOrigins = [
  'https://estudiocontablejy.com.ar',
  'http://localhost:3000',
  'http://localhost:5173'
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

const seedDatabase = async () => {
  try {
    // Crear usuario admin si no existe
    const adminExists = await User.findOne({ email: 'admin@estudiocontablejy.com.ar' });
    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@estudiocontablejy.com.ar',
        password: 'estudiocontable13',
        role: 'admin',
        provider: 'local'
      });
      console.log('✓ Usuario admin creado');
    } else {
      console.log('✓ Usuario admin ya existe');
    }

    // Crear especialistas si no existen
    const specialistsCount = await Specialist.countDocuments();
    if (specialistsCount === 0) {
      await Specialist.insertMany([
        { area: 'Contable', name: 'Contadora Yanina Elba Fernandez', order: 1, active: true },
        { area: 'Contable', name: 'Contador Joel Jave Mendoza', order: 2, active: true },
        { area: 'Automatización', name: 'Alfonso Waldemar Subelza', order: 3, active: true }
      ]);
      console.log('✓ Especialistas creados');
    }

    // Crear herramientas si no existen
    const toolsCount = await Tool.countDocuments();
    if (toolsCount === 0) {
      await Tool.insertMany([
        { name: 'Cruce_ARBA-AGIP', description: 'Sistema de cruces de información fiscal ARBA y AGIP', category: 'impuestos', icon: '🔍', color: '#e94560', order: 1 }
      ]);
      console.log('✓ Herramientas creadas');
    }

    console.log('✓ Base de datos inicializada');
  } catch (error) {
    console.error('Error en seed:', error.message);
  }
};

connectDB().then(() => {
  seedDatabase();
});

app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.JWT_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/specialists', require('./routes/specialists'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tools', require('./routes/tools'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
