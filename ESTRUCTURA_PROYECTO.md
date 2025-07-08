# Estructura del Proyecto Innovapymes - Plantilla para Nuevas Verticales

## Stack Tecnológico
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Base de datos**: PostgreSQL + Drizzle ORM
- **Estilos**: TailwindCSS + Framer Motion
- **SEO**: SSG (Static Site Generation) pre-rendering
- **UI Components**: Radix UI + shadcn/ui

## Estructura de Archivos

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/ (shadcn components)
│   │   │   ├── HeroSection.tsx
│   │   │   ├── GlobalNavbar.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── VerticalesSection.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── SEOHead.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Servicios.tsx
│   │   │   ├── Verticales.tsx
│   │   │   ├── Labs.tsx
│   │   │   └── LabsAdmin.tsx
│   │   ├── lib/
│   │   │   ├── animations.ts
│   │   │   ├── mouse-light-effect.ts
│   │   │   └── queryClient.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
├── server/
│   ├── routes/
│   │   ├── labs_router.ts
│   │   └── uploads.ts
│   ├── storage/
│   │   └── labs.ts
│   ├── index.ts
│   ├── routes.ts
│   ├── db.ts
│   └── storage.ts
├── shared/
│   └── schema.ts
├── scripts/
│   └── prerender.js
├── public/
│   ├── sitemap.xml
│   └── robots.txt
└── dist/ssg/ (páginas pre-renderizadas)
```

## Características Principales

### 1. Diseño Visual
- **Tema**: Cyberpunk/futurista con fondo oscuro
- **Colores**: Gradientes neon (azul, morado, rosa)
- **Efectos**: Glassmorphism, partículas animadas, glow effects
- **Animaciones**: Framer Motion con efectos de entrada

### 2. Componentes Clave

#### HeroSection.tsx
- Texto con efecto glitch
- Texto rotativo
- Botones con efectos de partículas
- Objetos flotantes 3D

#### ParticleBackground.tsx
- Sistema de partículas interactivo
- Líneas de conexión dinámicas
- Efectos de mouse hover

#### GlobalNavbar.tsx
- Logo circular con glassmorphism
- Navegación responsiva
- Efectos de hover

### 3. Sistema SEO (SSG)
- Pre-rendering de páginas estáticas
- Meta tags dinámicos por página
- Structured data (JSON-LD)
- Sitemap.xml automático
- robots.txt configurado

### 4. Sistema de Gestión de Contenido
- CRUD completo para posts (Labs)
- Subida de imágenes
- Base de datos PostgreSQL
- Validación con Zod

## Configuración de Dominio

### Meta Tags Base (client/index.html)
```html
<meta property="og:url" content="https://TUDOMINIO.ai" />
<meta property="og:image" content="/logo.png" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TuEmpresa",
  "url": "https://TUDOMINIO.ai",
  "logo": "https://TUDOMINIO.ai/logo.png"
}
</script>
```

### Script Pre-rendering (scripts/prerender.js)
- Configurar dominio en metaTags object
- Actualizar URLs en sitemap generation
- Cambiar email de contacto

### Archivos SEO (public/)
- sitemap.xml: URLs del dominio
- robots.txt: referencia al sitemap

## Paleta de Colores para Personalizar

### Innovapymes (actual)
```css
--primary: 228 100% 70% /* azul neon */
--secondary: 270 100% 70% /* morado */
--accent: 330 100% 70% /* rosa */
```

### Gradientes principales
```css
bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
bg-gradient-to-br from-purple-600/20 to-blue-600/20
```

## Pasos para Nueva Vertical

1. **Copiar estructura completa**
2. **Cambiar branding**:
   - Logo en /public/
   - Colores en CSS
   - Nombre de empresa
3. **Actualizar contenido**:
   - Servicios específicos
   - Verticales relevantes
   - Texto de hero section
4. **Configurar dominio**:
   - Meta tags
   - Sitemap
   - Structured data
5. **Personalizar animaciones** (opcional)

## Comandos de Desarrollo

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
node scripts/prerender.js  # Generar SSG
```

## Dependencias Principales

```json
{
  "react": "^18.3.1",
  "typescript": "5.6.3",
  "vite": "^5.4.14",
  "tailwindcss": "^3.4.17",
  "framer-motion": "^11.18.2",
  "@tanstack/react-query": "^5.60.5",
  "drizzle-orm": "^0.39.1",
  "express": "^4.21.2"
}
```

## Notas Importantes

- El sistema SSG sirve páginas pre-renderizadas a bots de búsqueda automáticamente
- Las animaciones mantienen interactividad completa
- Base de datos PostgreSQL configurada con Drizzle ORM
- Headers de seguridad incluidos para producción
- Responsive design completo (mobile, tablet, desktop)

---

**Archivo generado para facilitar la creación de nuevas verticales basadas en la estructura de Innovapymes**