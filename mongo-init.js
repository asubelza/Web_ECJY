db = db.getSiblingDB('estudio_contable_jy');

db.createCollection('users');
db.createCollection('contacts');
db.createCollection('specialists');
db.createCollection('tools');

db.specialists.insertMany([
  { area: 'Contable', name: 'Contadora Yanina Elba Fernandez', order: 1, active: true, createdAt: new Date() },
  { area: 'Contable', name: 'Contador Joel Jave Mendoza', order: 2, active: true, createdAt: new Date() },
  { area: 'Automatización', name: 'Alfonso Waldemar Subelza', order: 3, active: true, createdAt: new Date() }
]);

db.tools.insertMany([
  {
    name: 'Liquidación de Sueldos',
    description: 'Sistema de liquidación de nómina y salaries',
    category: 'nomina',
    url: '',
    icon: '👥',
    color: '#0f3460',
    isExternal: false,
    active: true,
    order: 1,
    createdAt: new Date()
  },
  {
    name: 'Generador de Facturas',
    description: 'Crea y emite facturas electrónicas',
    category: 'facturacion',
    url: '',
    icon: '📄',
    color: '#e94560',
    isExternal: false,
    active: true,
    order: 2,
    createdAt: new Date()
  },
  {
    name: 'Calculadora de Impuestos',
    description: 'Calcula impuestos según régimen',
    category: 'impuestos',
    url: '',
    icon: '💰',
    color: '#f39c12',
    isExternal: false,
    active: true,
    order: 3,
    createdAt: new Date()
  },
  {
    name: 'Balance en Línea',
    description: 'Consulta estados contables en tiempo real',
    category: 'contabilidad',
    url: '',
    icon: '📊',
    color: '#4a90e2',
    isExternal: false,
    active: true,
    order: 4,
    createdAt: new Date()
  },
  {
    name: 'Reportes Mensuales',
    description: 'Genera informes y reportes mensuales',
    category: 'reportes',
    url: '',
    icon: '📈',
    color: '#50c878',
    isExternal: false,
    active: true,
    order: 5,
    createdAt: new Date()
  },
  {
    name: 'Cruce ARBA-AGIP',
    description: 'Herramienta de cruces de información fiscal ARBA y AGIP',
    category: 'impuestos',
    url: 'http://localhost:3001',
    icon: '🔍',
    color: '#8e44ad',
    isExternal: true,
    active: true,
    order: 6,
    createdAt: new Date()
  }
]);

print('Datos iniciales creados exitosamente');
