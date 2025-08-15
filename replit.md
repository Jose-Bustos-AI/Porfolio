# Overview

This is a personal portfolio and business website for Jose Bustos, an AI and automation specialist who provides AI solutions and automation services for small and medium enterprises. The application features a modern futuristic design with advanced visual effects, particle backgrounds, and interactive elements. It includes a portfolio section to showcase projects and blog posts, with an admin interface for content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe development and modern component patterns
- **Build Tool**: Vite for fast development server and optimized production builds with ESM support
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **Styling**: TailwindCSS with custom utility classes, neon-themed design system, and responsive mobile-first approach
- **Animations**: Framer Motion for complex animations, scroll-triggered reveals, and particle effects
- **UI Components**: Radix UI primitives with shadcn/ui component system for accessible, customizable components
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Performance**: Lazy loading for images, debounced interactions, optimized particle system, and component code splitting

## Backend Architecture
- **Runtime**: Node.js with Express server providing REST API endpoints
- **Language**: TypeScript for full-stack type safety and better developer experience
- **API Design**: RESTful endpoints with structured error handling, input validation, and consistent response formats
- **File Management**: Multer middleware for secure image upload handling with type and size validation
- **Security**: Comprehensive security implementation with Helmet for headers, rate limiting, CORS configuration
- **Authentication**: Secure admin authentication system with session tokens, rate limiting, and brute force protection

## Database Design
- **Database**: PostgreSQL with connection pooling via Neon serverless for scalability
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema**: Centralized schema definitions in shared directory for consistency across frontend and backend
- **Migrations**: Drizzle Kit for database schema versioning and deployment

## Security Implementation
- **Authentication**: Token-based admin authentication with secure session management and automatic expiration
- **Input Validation**: Zod schemas for comprehensive API request validation and type checking
- **Content Sanitization**: DOMPurify for safe HTML rendering and XSS prevention
- **Security Headers**: CSP, HSTS, XSS protection, and CSRF prevention
- **Rate Limiting**: Configurable rate limiting for API endpoints, especially authentication routes
- **Logging**: Sanitized logging system that automatically redacts sensitive information

## Visual Effects System
- **Particle System**: Custom WebGL-based particle system with mouse interaction and optimized rendering
- **Animation Library**: Framer Motion with staggered animations, scroll-triggered reveals, and hover effects
- **Design Theme**: Dark cyberpunk theme with neon accent colors (blue, purple, pink, orange)
- **Responsive Design**: Mobile-first approach with adaptive layouts and touch-friendly interactions
- **Performance**: Optimized rendering with requestAnimationFrame and intersection observers

## Content Management
- **Portfolio System**: Full CRUD operations for blog posts with rich media support
- **Media Handling**: Secure image upload with validation, resizing, and CDN-ready storage
- **Admin Interface**: Protected admin panel for content creation and management
- **Rich Content**: Support for HTML content with sanitization, video embeds, and GitHub links

# External Dependencies

## Core Technologies
- **React Ecosystem**: React 18, TypeScript 5.x, Vite 5.x for modern development experience
- **Database**: PostgreSQL via Neon serverless with connection pooling and automatic scaling
- **ORM**: Drizzle ORM with Drizzle Kit for type-safe database operations
- **UI Framework**: TailwindCSS for styling with PostCSS for processing

## Authentication & Security
- **Security Headers**: Helmet.js for comprehensive HTTP security headers
- **Rate Limiting**: express-rate-limit for API protection against abuse
- **Input Validation**: Zod for schema validation and type checking
- **Content Sanitization**: DOMPurify for safe HTML rendering

## UI Components & Animation
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Design System**: shadcn/ui for pre-built, customizable components
- **Animation**: Framer Motion for complex animations and gesture handling
- **Icons**: Remix Icon for comprehensive icon set

## File Handling & Media
- **File Uploads**: Multer for handling multipart/form-data and file validation
- **Image Processing**: Built-in validation for file types, sizes, and security
- **Static Assets**: Express static file serving with proper caching headers

## Development & Build
- **Build System**: ESBuild for fast compilation and bundling
- **Code Quality**: TypeScript strict mode for type safety
- **Performance**: Compression middleware for gzip/brotli support
- **Environment**: dotenv for environment variable management

## External Integrations
- **Email Newsletter**: n8n webhook integration for newsletter subscriptions
- **Analytics Ready**: Structured for easy integration with analytics platforms
- **SEO Optimized**: Meta tags, Open Graph, Twitter Card, and Schema.org markup
- **CDN Ready**: Static asset structure optimized for CDN deployment