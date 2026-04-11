# Security Review -Homologacion

## Issues Encontrados

### 1. CORS permite cualquier origen
**Archivo**: `backend/src/server.js`
**Problema**: `origin: function(origin, callback)` siempre returns `true`
**Riesgo**:alto
**Fix**: Validar contra lista de dominios permitidos

### 2. Sin rate limiting
**Problema**: No hay protección contra ataques de fuerza bruta
**Riesgo**:alto
**Fix**: Agregar express-rate-limit

### 3. Cookies sin atributos seguros
**Archivo**: `backend/src/server.js`
**Problema**: 
- Falta `httpOnly: true` para prevenir XSS
- Falta `sameSite` policy
**Riesgo**: medio
**Fix**: Agregar atributos a cookie config

### 4. JWT sin algoritmo explícito
**Archivo**: `backend/src/auth.js`
**Problema**: No especifica algoritmo (usa HS256 por defecto)
**Riesgo**: bajo
**Fix**: Especificar algoritmo explícitamente

### 5. Headers de seguridad faltantes
**Problema**: No hay headers X-Content-Type-Options, X-Frame-Options, etc.
**Riesgo**: medio
**Fix**: Agregar helmet.js

## Recomendaciones immediatas
1. Agregar helmet.js
2. Agregar rate limiting a /api/auth/*
3. Fix CORS para solo permitir dominios已知

## Pendiente de Revisión
- Validación de inputs en formularios
- Sanitización de datos
- SQL injection prevention (usar Mongoose ya ayuda)