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
├── frontend/               # Next.js 14 App Router
├── Cruce_ARBA-AGIP/        # Herramienta de cruces (submodule)
├── docker-compose.yml      # Orquestación de servicios (desarrollo)
├── docker-compose.prod.yml # Orquestación con nginx (producción)
├── deploy.sh               # Script de deploy automático
├── nginx.conf              # Configuración de nginx
├── mongo-init.js           # Inicialización de MongoDB
└── .env                    # Variables de entorno
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

### Opción 1: VPS (Recomendado)

Esta es la opción más flexible para implementar con Docker.

#### Proveedores recomendados en Argentina:
- **LightNode**: Desde $7.71/mes - Datacenter Buenos Aires
- **DigitalOcean**: Desde $4/mes - Muy popular
- **Contabo**: Desde €5/mes

#### Pasos de deploy:

```bash
# 1. Conectar al VPS por SSH
ssh usuario@tu-servidor

# 2. Instalar Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 3. Clonar el repositorio (incluye submodules)
git clone --recurse-submodules https://github.com/asubelza/Web_ECJY.git
cd Web_ECJY

# 4. Configurar variables de entorno
cp .env.production .env
nano .env  # Editar con tus valores reales

# 5. Ejecutar deploy
chmod +x deploy.sh
./deploy.sh
```

#### Configuración adicional para producción:

1. **Configurar dominio** en `nginx.conf`:
   ```nginx
   server_name tudominio.com www.tudominio.com;
   ```

2. **SSL/HTTPS** (recomendado):
   ```bash
   # Instalar Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Obtener certificado
   sudo certbot --nginx -d tudominio.com -d www.tudominio.com
   ```

3. **Firewall** (opcional):
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

#### Archivos de producción:
| Archivo | Descripción |
|---------|-------------|
| `deploy.sh` | Script automático de deploy |
| `docker-compose.prod.yml` | Configuración con nginx |
| `nginx.conf` | Reverse proxy |
| `.env.production` | Template de variables |

### Opción 2: Servicios en la nube (Gratuitos)

Para proyectos personales o pequeños:

| Servicio | Plan gratis | Ideal para |
|----------|-------------|------------|
| Vercel | ✅ | Frontend Next.js |
| Railway | ✅ $5/mes | Backend Node.js |
| Render | ✅ | Backend Node.js |
| MongoDB Atlas | ✅ | Base de datos |
| Fly.io | ✅ | Docker |

### Configuración de producción

1. Cambiar `JWT_SECRET` por una clave segura (generar con: `openssl rand -base64 32`)
2. Actualizar `FRONTEND_URL` con tu dominio
3. Cambiar credenciales de MongoDB
4. Cambiar contraseña del usuario admin
5. Configurar SSL con Let's Encrypt

## Próximos Pasos

- [x] Panel de administración
- [x] Sistema de autenticación opcional
- [ ] Blog/Noticias
- [ ] Sistema de turnos
- [ ] Tests automatizados
- [ ] CI/CD con GitHub Actions
