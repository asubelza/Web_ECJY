# Estudio Contable JY - React + Node + Docker

Rediseño completo del sitio web usando **Next.js 14** (frontend), **Node.js/Express** (backend) y **Docker**.

## 🚀 Características

- **Frontend**: Next.js 14 con React Bootstrap
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB 7
- **Autenticación**: JWT + Social Login (Google, Facebook, Microsoft, Instagram)
- **Docker**: Containerización completa
- **Herramientas**: Integración con herramienta "Cruce ARBA-AGIP"

## 📋 Requisitos

- Docker Desktop (Windows/Mac) o Docker + Docker Compose (Linux)
- Node.js 18+ (solo para desarrollo local sin Docker)

## Inicio Rápido con Docker

### 1. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env .env

# Editar .env con tus credenciales:
# - JWT_SECRET: Clave secreta para JWT
# - SMTP_*: Configuración de email para el formulario de contacto
```

### 2. Construir y ejecutar

```bash
# Construir y levantar todos los servicios
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### 3. Crear datos iniciales

```bash
# Crear usuario admin y especialistas
docker-compose exec backend node src/seed.js
```

**Credenciales Admin:**
- Email: `admin@estudiocontable.com`
- Password: `admin123456`

### 4. Acceder a la aplicación

| Servicio | URL |
|----------|-----|
| Frontend (Next.js) | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Mongo Express | http://localhost:8081 |

### Credenciales Mongo Express
- Usuario: `admin`
- Contraseña: `admin`

## Sistema de Autenticación (Opcional)

El sitio funciona **sin necesidad de registro**, pero incluye un sistema de autenticación opcional:

### Para Usuarios
- **Registro:** http://localhost:3000/registro
- **Login:** http://localhost:3000/login
- **Perfil:** http://localhost:3000/perfil

### Para Administradores
- **Panel Admin:** http://localhost:3000/admin
- **Gestión de Mensajes:** http://localhost:3000/admin/contactos
- **Gestión de Especialistas:** http://localhost:3000/admin/especialistas

### Funcionalidades del Admin
- Ver y gestionar mensajes de contacto
- Crear, editar y eliminar especialistas
- Cambiar estado de mensajes (Pendiente → Leído → Respondido)

## Estructura del Proyecto

```
├── backend/                 # API REST con Node.js + Express
│   ├── src/
│   │   ├── config/         # Configuraciones
│   │   ├── controllers/    # Controladores
│   │   ├── middleware/     # Middlewares
│   │   ├── models/         # Modelos Mongoose
│   │   ├── routes/         # Rutas API
│   │   ├── services/       # Servicios (email)
│   │   └── server.js       # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # Next.js 14 App Router
│   ├── src/
│   │   ├── app/           # Páginas
│   │   │   ├── admin/     # Panel de administración
│   │   │   ├── login/     # Página de login
│   │   │   ├── registro/  # Página de registro
│   │   │   └── ...
│   │   ├── components/    # Componentes
│   │   ├── context/       # Contextos (AuthContext)
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilidades
│   │   └── styles/        # SCSS
│   ├── public/            # Archivos estáticos
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml     # Orquestación de servicios
├── mongo-init.js          # Inicialización de MongoDB
└── .env                   # Variables de entorno
```

## Servicios Docker

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| frontend | 3000 | Next.js App |
| backend | 5000 | API REST |
| mongodb | 27017 | Base de datos |
| mongo-express | 8081 | UI para MongoDB |
| cruce_frontend | 3001 | Herramienta Cruce ARBA-AGIP |
| cruce_backend | 8000 | Backend Cruce ARBA-AGIP |

## API Endpoints

### Auth
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Usuario actual (requiere token)

### Contacto
- `POST /api/contact` - Enviar formulario (público)
- `GET /api/contact` - Listar contactos (admin)
- `PATCH /api/contact/:id` - Actualizar estado (admin)

### Especialistas
- `GET /api/specialists` - Listar (público)
- `POST /api/specialists` - Crear (admin)
- `PUT /api/specialists/:id` - Actualizar (admin)
- `DELETE /api/specialists/:id` - Eliminar (admin)

## Configuración de Email

Para que funcione el formulario de contacto, configura las variables SMTP en `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password  # Generar en Google Account > Security > App passwords
EMAIL_FROM=Estudio Contable JY <tu_email@gmail.com>
EMAIL_TO=email_destino@gmail.com
```

## Comandos Docker

```bash
# Levantar servicios
docker-compose up -d

# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Reiniciar un servicio
docker-compose restart backend

# Reconstruir un servicio
docker-compose up -d --build backend

# Detener todos los servicios
docker-compose down

# Eliminar volúmenes (CUIDADO: borra la base de datos)
docker-compose down -v

# Acceder a un contenedor
docker-compose exec backend sh
docker-compose exec mongodb mongosh -u admin -p password123

# Ejecutar seed para crear datos iniciales
docker-compose exec backend node src/seed.js
```

## Desarrollo Local (sin Docker)

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Tecnologías

### Backend
- Node.js 20 + Express
- MongoDB 7 + Mongoose
- JWT (autenticación)
- Nodemailer (emails)
- Docker

### Frontend
- Next.js 14 (App Router)
- React 18 + TypeScript
- Bootstrap 5 + React Bootstrap
- SCSS
- Axios
- AOS (animaciones)
- React Hot Toast (notificaciones)
- Docker

## Producción

Para deploy en producción:

1. Cambiar `JWT_SECRET` por una clave segura
2. Actualizar `NEXT_PUBLIC_API_URL` con el dominio del backend
3. Configurar HTTPS con reverse proxy (nginx/traefik)
4. Cambiar credenciales de MongoDB
5. Eliminar `mongo-express` del docker-compose
6. Cambiar contraseña del usuario admin

## Próximos Pasos

- [x] Panel de administración
- [x] Sistema de autenticación opcional
- [ ] Blog/Noticias
- [ ] Sistema de turnos
- [ ] Tests automatizados
- [ ] CI/CD con GitHub Actions
