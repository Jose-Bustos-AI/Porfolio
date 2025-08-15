# Overview

This is a personal portfolio and business website for Jose Bustos, an AI and automation specialist who provides AI solutions and automation services for small and medium enterprises. The application features a modern, futuristic design with advanced visual effects, particle backgrounds, and interactive elements. It includes a portfolio section to showcase projects and publications, with full admin functionality for content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React 18 and TypeScript, using Vite for fast development and optimized production builds. The application uses Wouter for lightweight client-side routing and TailwindCSS for styling with a custom neon-themed design system. Framer Motion provides complex animations and interactions throughout the interface.

The UI component system is based on Radix UI primitives with shadcn/ui components for consistent, accessible interfaces. State management is handled by React Query (TanStack Query) for server state, with lazy loading implemented for images and optimized particle effects for performance.

The visual design features a cyberpunk aesthetic with particle systems, WebGL-based backgrounds with mouse interaction, and responsive layouts using a mobile-first approach. The color scheme uses neon accent colors (blue, purple, pink, orange) against dark backgrounds.

## Backend Architecture
The backend runs on Node.js with Express server, written in TypeScript for full-stack type safety. The API follows RESTful design principles with proper error handling and validation using Zod schemas. File uploads are handled through Multer middleware for image management.

Security is implemented through Helmet for security headers, rate limiting for authentication endpoints, input sanitization with DOMPurify, and secure admin authentication with session token management. All sensitive data is sanitized in logs to prevent exposure.

## Database Design
The application uses PostgreSQL with connection pooling via Neon serverless, accessed through Drizzle ORM for type-safe database operations. Schema definitions are centralized in the shared directory for consistency across frontend and backend. Database migrations are managed through Drizzle Kit.

The schema includes tables for users, posts (portfolio content), with support for rich content including images, videos, and GitHub links. All content supports publishing states and timestamps for creation and updates.

## Security Implementation
Authentication uses a secure admin login system with rate limiting (5 attempts per 15-minute window) and random delays for failed attempts. Input validation is performed with Zod schemas, and all HTML content is sanitized with DOMPurify before rendering.

Security headers include CSP, HSTS, and XSS protection. Logging is implemented with sensitive data redaction to prevent credential exposure in logs. Session management uses secure tokens rather than simple boolean flags.

## Visual Effects System
The application features a custom WebGL-based particle system with mouse interaction and responsive behavior. Animations include staggered sequences, scroll-triggered reveals, and sophisticated hover effects. The theming system supports dynamic neon colors with glow effects and glass morphism design elements.

# External Dependencies

## Core Technologies
- **Database**: PostgreSQL via Neon serverless platform for scalable data storage
- **ORM**: Drizzle ORM with Drizzle Kit for type-safe database operations and migrations
- **Authentication**: Custom token-based system with rate limiting via express-rate-limit
- **File Storage**: Local file system with Multer for image uploads
- **Fonts**: Google Fonts (Inter, JetBrains Mono, Space Grotesk) and Remix Icons for iconography

## UI and Animation Libraries
- **Component System**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for complex animations and interactions
- **Styling**: TailwindCSS with PostCSS and Autoprefixer for cross-browser compatibility
- **Form Handling**: React Hook Form with Hookform Resolvers for validation integration

## Development and Build Tools
- **Build System**: Vite for development server and production builds
- **TypeScript**: Full-stack type safety with shared schema definitions
- **Code Quality**: ESBuild for server bundling and optimization
- **Performance**: React Query for server state management and caching

## Security and Validation
- **Input Validation**: Zod for runtime type checking and schema validation
- **Content Sanitization**: DOMPurify for safe HTML rendering and XSS prevention
- **Security Headers**: Helmet for Express security middleware
- **Compression**: Compression middleware for response optimization

## External Services
- **Email Integration**: Webhook-based newsletter subscription via n8n automation platform
- **CDN Resources**: External image hosting via Unsplash for placeholder content
- **Video Embedding**: YouTube embed support for portfolio content