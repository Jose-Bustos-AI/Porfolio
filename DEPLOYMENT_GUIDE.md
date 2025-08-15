# Guía de Despliegue

Este proyecto está listo para desplegarse en plataformas como Vercel, Netlify, Railway, o cualquier hosting que soporte Node.js.

## Variables de Entorno Requeridas

Asegúrate de configurar estas variables de entorno en tu plataforma de hosting:

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
```

## Comandos de Despliegue

### Build
```bash
npm run build
```

### Start
```bash
npm start
```

## Configuración de Base de Datos

El proyecto usa PostgreSQL con Drizzle ORM. Para migrar el esquema:

```bash
npm run db:push
```

## Estructura para Producción

- Los archivos estáticos se sirven desde `/public`
- La aplicación React se construye en `/dist/public`
- El servidor Express maneja tanto la API como el serving de archivos estáticos

## Notas de Seguridad

- Los headers de seguridad están configurados con Helmet
- Rate limiting implementado para endpoints de API
- Sanitización de inputs con Zod
- Content Security Policy configurada

## Funcionalidades

- ✅ Portfolio personal con sección de proyectos
- ✅ Descarga de CV en PDF
- ✅ Diseño responsivo optimizado
- ✅ Efectos visuales y animaciones avanzadas
- ✅ SEO optimizado
- ✅ Sistema de administración para contenido