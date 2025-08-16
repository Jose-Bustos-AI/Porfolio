## Docker

Este proyecto incluye archivos para dockerización:

- `.dockerignore`
- `Dockerfile`
- `docker-compose.yml`
- `.env.example` (plantilla)

Sigue las instrucciones en `.env.example` para crear tu `.env` (no lo subas al repo).

# Jose Bustos - Portfolio

Portfolio personal y sitio web de negocio para Jose Bustos, especialista en IA y automatización que proporciona soluciones de inteligencia artificial y automatización para pequeñas y medianas empresas.

## Descripción

Esta aplicación presenta un diseño moderno y futurista con efectos visuales avanzados, fondos de partículas y elementos interactivos. Incluye una sección de portfolio para mostrar proyectos y publicaciones de blog, con una interfaz de administración para gestión de contenido.

## Stack Tecnológico

### Frontend
- **Framework**: React 18 con TypeScript para desarrollo moderno y tipado seguro
- **Build Tool**: Vite para desarrollo rápido y builds optimizados para producción
- **Routing**: Wouter para enrutamiento ligero del lado del cliente
- **Styling**: TailwindCSS con clases utilitarias personalizadas para diseño responsivo
- **Animations**: Framer Motion para animaciones complejas e interacciones
- **UI Components**: Primitivos de Radix UI con sistema de componentes shadcn/ui
- **State Management**: React Query (TanStack Query) para gestión del estado del servidor
- **Performance**: Lazy loading para imágenes, interacciones debounced y efectos de partículas optimizados

### Backend
- **Runtime**: Node.js con servidor Express
- **Language**: TypeScript para tipado seguro full-stack
- **API Design**: Endpoints RESTful con manejo de errores y validación adecuados
- **File Uploads**: Middleware Multer para manejo de subida de imágenes
- **Security**: Helmet para headers de seguridad, rate limiting, sanitización de inputs
- **Authentication**: Autenticación de admin basada en tokens con gestión segura de sesiones

### Base de Datos
- **Database**: PostgreSQL con connection pooling vía Neon serverless
- **ORM**: Drizzle ORM para operaciones de base de datos type-safe
- **Schema Management**: Definiciones de esquema centralizadas en directorio shared
- **Migrations**: Drizzle Kit para gestión de esquema de base de datos

### Seguridad
- **Authentication**: Login de admin seguro con rate limiting y tokens de sesión
- **Input Validation**: Esquemas Zod para validación de requests de API
- **Content Sanitization**: DOMPurify para renderizado seguro de HTML
- **Headers**: Headers de seguridad incluyendo CSP, HSTS y protección XSS
- **Logging**: Logging sanitizado que redacta información sensible

### Sistema de Efectos Visuales
- **Particle System**: Sistema de partículas personalizado basado en WebGL con interacción del mouse
- **Animations**: Animaciones escalonadas, reveals activados por scroll y efectos hover
- **Theming**: Tema oscuro con colores de acento neón (azul, púrpura, rosa, naranja)
- **Responsive Design**: Enfoque mobile-first con layouts adaptativos

## Scripts

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar en producción
npm run start

# Verificación de tipos
npm run check

# Push de esquema de base de datos
npm run db:push
```

## Variables de Entorno

```bash
DATABASE_URL=your_postgresql_url
NODE_ENV=production|development
```

## Despliegue

La aplicación está optimizada para despliegue en Vercel y otras plataformas de hosting modernas.

## Estructura del Proyecto

```
├── client/                 # Aplicación React frontend
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas de la aplicación
│   │   └── lib/           # Utilidades y configuración
├── server/                # Servidor Express backend
│   ├── routes/           # Rutas de API
│   └── middleware/       # Middleware personalizado
├── shared/               # Esquemas y tipos compartidos
├── public/              # Assets estáticos
└── scripts/             # Scripts de build y utilidades
```