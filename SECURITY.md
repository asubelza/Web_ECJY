# Security Review - Estudio Contable JY

## Estado de Seguridad Actual

### ✅ Implementado

| Medida | Archivo | Estado |
|--------|---------|--------|
| Helmet.js headers | server.js:27 | ✅ Implementado |
| Rate Limiting | server.js:18-24 | ✅ 100 req/15min global |
| CORS restrictivo | server.js:30-44 | ✅ Solo dominios autorizados |
| Cookies seguras | server.js:105-115 | ✅ httpOnly + sameSite:strict |
| Validación de inputs | routes/*.js | ✅ express-validator |
| Middleware de auth | middleware/auth.js | ✅ JWT verify |
| Protección XSS | - | ✅ React escapa por defecto |

### Archivos de CORS autorizados

```javascript
const allowedOrigins = [
  'https://estudiocontablejy.com.ar',  // Producción
  'http://localhost:3000',              // Desarrollo frontend
  'http://localhost:5173'               // Vite dev
];
```

### Rate Limiting

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,                 // 100 requests
  message: 'Demasiadas solicitudes'
});
app.use('/api/', limiter);
```

## Endpoints de Usuarios (Admin)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/users` | ✅ Admin | Listar usuarios |
| GET | `/api/users/stats` | ✅ Admin | Estadísticas dashboard |
| GET | `/api/users/:id` | ✅ Admin | Ver usuario |
| POST | `/api/users` | ✅ Admin | Crear usuario |
| PUT | `/api/users/:id` | ✅ Admin | Editar usuario |
| PUT | `/api/users/:id/reset-password` | ✅ Admin | Resetear password |
| DELETE | `/api/users/:id` | ✅ Admin | Eliminar usuario |

### Validación de Create User

```javascript
body('name').trim().notEmpty()
body('email').isEmail()
body('password').isLength({ min: 6 })
body('role').isIn(['admin', 'user'])
```

### Validación de Reset Password

```javascript
body('newPassword').isLength({ min: 6 })
```

## Recomendaciones Futuras

1. **Rate limiting específico** - Aplicar límites más estrictos a endpoints de auth (login attempts)
2. **Logging** - Agregar logging de seguridad (intentos de login fallidos)
3. **Audit trail** - Registrar acciones de admins en log
4. **Input sanitization** - Agregar sanitización adicional para campos de texto largo
5. **HTTPS** - Forzar HTTPS en producción (ya configurado con nginx + SSL)
6. **2FA** - Considerar Two-Factor Authentication para admins

## Políticas de Seguridad

- Contraseñas hasheadas con bcrypt (12 rounds)
- JWT expira en 7 días
- Sesiones HTTP-only con SameSite: strict
- No exponer stack traces en producción

## Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, contacta al equipo de desarrollo.