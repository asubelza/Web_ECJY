# API Documentation - Estudio Contable JY

## Base URL

```
Producción: https://estudiocontablejy.com.ar/api
Desarrollo: http://localhost:5000/api
```

## Autenticación

### Endpoints de Auth

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Registrar nuevo usuario |
| POST | `/auth/login` | ❌ | Iniciar sesión (JWT + session) |
| GET | `/auth/me` | ✅ JWT | Obtener usuario actual |
| GET | `/auth/google` | ❌ | Login con Google |
| GET | `/auth/facebook` | ❌ | Login con Facebook |
| GET | `/auth/microsoft` | ❌ | Login con Microsoft |
| GET | `/auth/instagram` | ❌ | Login con Instagram |

### Login (POST /api/auth/login)

**Request:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Usuario",
    "email": "...",
    "role": "user"
  }
}
```

### Register (POST /api/auth/register)

**Request:**
```json
{
  "name": "Usuario Nuevo",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

---

## Contacto

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/contact` | ❌ | Enviar formulario de contacto |
| GET | `/contact` | ✅ Admin | Listar todos los mensajes |
| PATCH | `/contact/:id` | ✅ Admin | Actualizar estado |

### Enviar Contacto (POST /api/contact)

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "11-1234-5678",
  "message": "Consulta sobre servicios contables"
}
```

---

## Especialistas

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/specialists` | ❌ | Listar especialistas (público) |
| POST | `/specialists` | ✅ Admin | Crear especialista |
| PUT | `/specialists/:id` | ✅ Admin | Actualizar especialista |
| DELETE | `/specialists/:id` | ✅ Admin | Eliminar especialista |

---

## Usuarios (Admin)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/users` | ✅ Admin | Listar usuarios |
| GET | `/users/stats` | ✅ Admin | Estadísticas del dashboard |
| GET | `/users/:id` | ✅ Admin | Ver usuario por ID |
| POST | `/users` | ✅ Admin | Crear usuario |
| PUT | `/users/:id` | ✅ Admin | Editar usuario |
| PUT | `/users/:id/reset-password` | ✅ Admin | Resetear password |
| DELETE | `/users/:id` | ✅ Admin | Eliminar usuario |

### Listar Usuarios (GET /api/users)

**Query Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| page | number | Página (default: 1) |
| limit | number | Items por página (default: 20) |
| role | string | Filtrar por rol (admin/user) |
| search | string | Buscar por nombre o email |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Usuario",
      "email": "...",
      "role": "user",
      "provider": "local",
      "active": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

### Crear Usuario (POST /api/users)

**Request:**
```json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@ejemplo.com",
  "password": "password123",
  "role": "user"
}
```

**Validación:**
- name: requerido, no vacío
- email: requerido, formato válido
- password: mínimo 6 caracteres
- role: obligatorio, valores: "admin" | "user"

### Reset Password (PUT /api/users/:id/reset-password)

**Request:**
```json
{
  "newPassword": "nuevaPassword123"
}
```

**Validación:**
- newPassword: mínimo 6 caracteres

---

## Herramientas

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/tools` | ❌ | Listar herramientas disponibles |

---

## Utilidades

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/health` | ❌ | Health check del servidor |

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - No autorizado |
| 404 | Not Found - Recurso no encontrado |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error |

---

## Encabezados Requeridos

```http
Content-Type: application/json
Authorization: Bearer <token_jwt>
```

Para endpoints que requieren auth, incluir el JWT en el header:
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```