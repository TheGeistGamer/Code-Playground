# 📦 Docker Compose - Entorno de Desarrollo

Este archivo `docker-compose.yml` levanta un entorno completo para la aplicación de Pokémon basada en **NestJS**, junto con uan base de datos MongoDB y una interfaz web para su administración.

## 🧱 Servicios incluidos

### 🗄️ db (MongoDB)

Servicio principal de base de datos.

- Imagen: `mongo:6.0`
- Persistencia mediante volumen: `poke-vol`
- Autenticación habilitada (`--auth`)
- Variable de entorno:
  - `MONGO_INITDB_ROOT_USERNAME`
  - `MONGO_INITDB_ROOT_PASSWORD`

### 📌 Notas

- No expone el puerto al host (serguridad por defecto).
- Solo accesible desde otros contenedores.

## 🌐 mongo-express

Interfaz web para administrar MongoDB

- Imagen: `mongo-express:1.0.0-alpha.4`
- Puerto expuesto: `http://localhost:8080`
- Depende de: `db`

### 🔑 Variables de entorno

- `ME_CONFIG_MONGODB_SERVER`
- `ME_CONFIG_MONGODB_ADMINUSERNAME`
- `ME_CONFIG_MONGODB_ADMINPASSWORD`

### 📌 Uso

Permite visualizar colecciones, documentos y ejecutar queries desde el navegador.

## 🚀 poke-app

Aplicación backend contruida con NestJS.

- Imagen: `klerith/pokemon-nest-app:1.0.0` 
- Puerto expuesto: `http://localhost:3000`
- Depende de:
  - `db`
  - `mongo-express`

### 🔑 Variables de entorno (poke-app)

- `MONGODB`: URI de conexión a MongoDB
- `DB_NAME`: nombre de la base de datos

### 💾 Volúmenes

`poke-vol`

- Tipo: volumen local
- Uso: persistir los datos de MongoDB
- Evitar pérdida de datos al reinicar contenedores.

## ▶️ Cómo ejecutar

```bash
docker-compose up -d
```

para denter:

```bash
docker-compose down
```

## 🌍 Accesos

- API[http://localhost:3000]
- Mongo Express[http://localhost:8080]

## 🧠 Consideraciones

- MongoDB no expone puertos al host -> más seguro
- `mongo-express` solo debería userse en desarrollo
- El volumen asegura persistencia de datos
- Las dependencias (`depends_on`) no garantiza que el servicio esté listo, solo que se inicie
