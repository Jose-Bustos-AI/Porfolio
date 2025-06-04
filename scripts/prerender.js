import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rutas que queremos pre-renderizar
const routes = [
  { path: '/', name: 'index' },
  { path: '/servicios', name: 'servicios' },
  { path: '/verticales', name: 'verticales' },
  { path: '/labs', name: 'labs' },
];

// Meta tags específicos para cada página
const metaTags = {
  '/': {
    title: 'Innovapymes - Soluciones de IA y Automatización para PyMEs',
    description: 'Transformamos tu negocio con soluciones de IA personalizadas: SaaS, automatización web, chatbots inteligentes y marketing digital para restaurantes, salones, gimnasios, inmobiliarias y más.',
    keywords: 'IA, automatización, inteligencia artificial, SaaS, desarrollo web, chatbots, marketing digital, restaurantes, salones de belleza, estudios de tatuajes, gimnasios, inmobiliarias, PyMEs',
    canonical: 'https://innovapymes.ai/'
  },
  '/servicios': {
    title: 'Servicios de IA y Automatización - Innovapymes',
    description: 'Soluciones especializadas de IA: Desarrollo SaaS, automatización web con n8n/Make, chatbots inteligentes, aplicaciones móviles y marketing digital para PyMEs.',
    keywords: 'desarrollo SaaS, automatización web, n8n, Make, chatbots OpenAI, aplicaciones móviles, marketing digital, IA para empresas',
    canonical: 'https://innovapymes.ai/servicios'
  },
  '/verticales': {
    title: 'Verticales Especializadas - Innovapymes',
    description: 'Soluciones de IA especializadas para restaurantes (InnovaGastro), salones de belleza (InnovaBeauty), estudios de tatuajes (InnovaTattoo), gimnasios (InnovaFit), inmobiliarias (InnovaRealty) y más.',
    keywords: 'InnovaGastro, InnovaBeauty, InnovaTattoo, InnovaFit, InnovaRealty, InnovaLogic, restaurantes, salones belleza, estudios tatuajes, gimnasios, inmobiliarias, automatización',
    canonical: 'https://innovapymes.ai/verticales'
  },
  '/labs': {
    title: 'Innovapymes Labs - Blog de IA y Tecnología',
    description: 'Descubre las últimas tendencias en inteligencia artificial, automatización y tecnología para PyMEs. Artículos técnicos, casos de éxito y guías prácticas de implementación.',
    keywords: 'blog IA, inteligencia artificial, automatización, tecnología PyMEs, casos de éxito, innovación empresarial, transformación digital',
    canonical: 'https://innovapymes.ai/labs'
  }
};

// Leer el template HTML base
const templatePath = path.resolve(__dirname, '../client/index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Crear directorio de salida
const outputDir = path.resolve(__dirname, '../dist/ssg');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generar páginas estáticas
routes.forEach(route => {
  const meta = metaTags[route.path];
  
  // Crear structured data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Innovapymes",
    "description": meta.description,
    "url": meta.canonical,
    "logo": "https://innovapymes.ai/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@innovapymes.ai"
    },
    "sameAs": [
      "https://linkedin.com/company/innovapymes",
      "https://twitter.com/innovapymes"
    ]
  };

  // Para páginas específicas, agregar datos estructurados adicionales
  if (route.path === '/servicios') {
    structuredData["@type"] = "Service";
    structuredData.serviceType = "AI and Automation Solutions";
    structuredData.provider = {
      "@type": "Organization",
      "name": "Innovapymes"
    };
  }
  
  // Actualizar meta tags en el HTML
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/name="description" content=".*?"/, `name="description" content="${meta.description}"`)
    .replace(/name="keywords" content=".*?"/, `name="keywords" content="${meta.keywords}"`)
    .replace(/property="og:title" content=".*?"/, `property="og:title" content="${meta.title}"`)
    .replace(/property="og:description" content=".*?"/, `property="og:description" content="${meta.description}"`)
    .replace(/property="og:url" content=".*?"/, `property="og:url" content="${meta.canonical}"`)
    .replace(/name="twitter:title" content=".*?"/, `name="twitter:title" content="${meta.title}"`)
    .replace(/name="twitter:description" content=".*?"/, `name="twitter:description" content="${meta.description}"`);
  
  // Limpiar structured data existente y agregar el optimizado
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  
  // Agregar canonical URL y structured data optimizado
  if (!html.includes('rel="canonical"')) {
    html = html.replace('</head>', 
      `  <link rel="canonical" href="${meta.canonical}" />
  <script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>
</head>`);
  } else {
    html = html.replace('</head>', 
      `  <script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>
</head>`);
  }
  
  // Crear estructura de directorios
  const routePath = route.path === '/' ? '' : route.path;
  const dirPath = path.join(outputDir, routePath);
  
  if (routePath && !fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Escribir archivo HTML
  const filePath = route.path === '/' 
    ? path.join(outputDir, 'index.html')
    : path.join(dirPath, 'index.html');
  
  fs.writeFileSync(filePath, html);
  console.log(`✅ Generado: ${route.path} -> ${filePath}`);
});

// Generar sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>https://innovapymes.ai${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);

// Generar robots.txt
const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://innovapymes.ai/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /labs/admin/

# Allow all search engines to crawl the site
Crawl-delay: 1`;

fs.writeFileSync(path.join(outputDir, 'robots.txt'), robots);

console.log('🚀 Pre-rendering completado exitosamente!');
console.log(`📁 Archivos generados en: ${outputDir}`);
console.log('📄 Sitemap y robots.txt creados');