# docker build --tag <nombre> <path>
# Ej: docker build --tag node-app .


# La carpeta /app viene por defecto en la imagen de node
FROM node:22.2.0-alpine3.20 as deps
WORKDIR /app
COPY package.json ./
RUN npm install


FROM node:22.2.0-alpine3.20 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# RUN npm run test 
# RUN npm run build

# -- Dependencias de produccion --
FROM node:22.2.0-alpine3.20 as prod-deps
WORKDIR /app
COPY package.json ./
RUN npm install --prod

FROM node:22.2.0-alpine3.20 as runner
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY app.js ./
CMD [ "node", "app.js" ]