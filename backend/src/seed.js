require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Specialist = require('./models/Specialist');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conectado');

    await User.deleteMany();
    await Specialist.deleteMany();

    const adminUser = await User.create({
      name: 'Administrador',
      email: 'admin@estudiocontable.com',
      password: 'admin123456',
      role: 'admin'
    });
    console.log('Usuario admin creado:', adminUser.email);

    const specialists = await Specialist.insertMany([
      { area: 'Contable', name: 'Contadora Yanina Elba Fernandez', order: 1 },
      { area: 'Contable', name: 'Contador Joel Jave Mendoza', order: 2 },
      { area: 'Automatización', name: 'Alfonso Waldemar Subelza', order: 3 }
    ]);
    console.log('Especialistas creados:', specialists.length);

    console.log('\n=== DATOS DE SEMILLA CREADOS ===');
    console.log('Usuario admin: admin@estudiocontable.com');
    console.log('Contraseña: admin123456');
    console.log('================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedData();
