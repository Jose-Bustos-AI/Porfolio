# Overview

This is a personal portfolio and business website for Jose Bustos, an AI and automation specialist who provides AI solutions and automation services for small and medium enterprises. The application features a modern, futuristic design with advanced visual effects including particle backgrounds, neon styling, and interactive elements. It includes a portfolio section (previously Labs) for showcasing projects and publications with full CRUD functionality and admin authentication.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: TailwindCSS with custom utility classes and neon-themed design system
- **Animations**: Framer Motion for complex animations and interactions
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **State Management**: React Query (TanStack Query) for server state management
- **Performance**: Lazy loading for images, debounced interactions, and optimized particle effects

## Backend Architecture
- **Runtime**: Node.js with Express server
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful endpoints with proper error handling and validation
- **File Uploads**: Multer middleware for image upload handling
- **Security**: Helmet for security headers, rate limiting, input sanitization
- **Authentication**: Token-based admin authentication with secure session management

## Database Design
- **Database**: PostgreSQL with connection pooling via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database schema management

## Security Implementation
- **Authentication**: Secure admin login with rate limiting and session tokens
- **Input Validation**: Zod schemas for API request validation
- **Content Sanitization**: DOMPurify for safe HTML rendering
- **Security Headers**: Including CSP, HSTS, and XSS protection
- **Logging**: Sanitized logging that redacts sensitive information

## Visual Effects System
- **Particle System**: Custom WebGL-based particle system with mouse interaction
- **Animations**: Staggered animations, scroll-triggered reveals, and hover effects
- **Theming**: Dark theme with neon accent colors (blue, purple, pink, orange)
- **Responsive Design**: Mobile-first approach with adaptive layouts

# External Dependencies

## Core Technologies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for React components
- **wouter**: Lightweight routing for React applications

## UI and Styling
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: For component variant management
- **lucide-react**: Icon library for React components

## Security and Validation
- **helmet**: Security middleware for Express
- **zod**: TypeScript-first schema validation
- **dompurify**: XSS sanitization for HTML content
- **express-rate-limit**: Rate limiting middleware

## File Handling
- **multer**: Middleware for handling multipart/form-data
- **@types/multer**: TypeScript definitions for multer

## Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **@vitejs/plugin-react**: React support for Vite
- **esbuild**: Fast JavaScript bundler for production builds