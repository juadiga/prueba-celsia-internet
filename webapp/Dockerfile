# ---- Etapa de build ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Etapa de runtime ----
FROM nginxinc/nginx-unprivileged:alpine AS runtime

COPY --from=build /app/dist/webapp/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
