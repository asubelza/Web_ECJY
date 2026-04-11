# VM Deployment Guide

## Antes de cada deploy

### 1. Liberar espacio (importante!)
```bash
docker system prune -af
```

### 2. Commands estándar
```bash
cd ~/Web_ECJY
git pull origin [rama]
docker-compose up -d --build
```

### 3. Si hay problemas de red
```bash
docker-compose down
docker network prune -f
docker-compose up -d
```

### 4. Si hay errores de build
```bash
docker-compose down
docker rmi [imagen]
docker-compose build --no-cache [servicio]
docker-compose up -d
```

## Notas
- Puerto 80 = nginx → frontend
- Puerto 5000 = backend Estudio JY
- Puerto 8000 = backend Cruce
- Puerto 3001 = frontend Cruce

## Problemas comunes
- "Address already in use": algo ocupa el puerto
- "Connection refused": el servicio no está levantado
- "sharp is required": missing dependencia
- .git/index.lock -> `rm -f .git/index.lock`