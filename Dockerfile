FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
# La build de Vite sale a dist/public (ver vite.config.ts)
COPY --from=build /app/dist/public /usr/share/nginx/html
# Copiamos también los assets estáticos del repo (favicon, imágenes, pdf, etc.)
COPY public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
