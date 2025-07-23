# Innovapymes - Full-Stack Web Application

## Overview

Innovapymes is a sophisticated full-stack web application specializing in AI and automation solutions for small and medium enterprises (SMEs). The platform features a modern, futuristic design with advanced visual effects and serves as both a corporate website and a content management system for showcasing technology solutions across various business verticals.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animations**: Framer Motion for advanced animations and visual effects
- **State Management**: React Query (@tanstack/react-query) for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **File Uploads**: Multer for handling image uploads
- **Session Management**: Built-in session handling

### Design System
- **Theme**: Dark cyberpunk aesthetic with neon accents
- **Color Palette**: 
  - Primary: #050816 (dark background)
  - Accent colors: #00EEFF (blue), #BD00FF (purple), #FF00A0 (pink), #E65616 (orange), #62d957 (green)
- **Typography**: Inter, Space Grotesk, and JetBrains Mono fonts
- **Effects**: Particle backgrounds, glitch effects, glassmorphism, and interactive lighting

## Key Components

### Frontend Components
1. **Hero Section**: Interactive landing with particle effects and animated text
2. **Services Section**: Showcases technology offerings with hover animations
3. **Verticals Section**: Industry-specific solutions with tabbed interface
4. **Labs (Blog)**: Content management system for technical articles
5. **Global Navigation**: Responsive navbar with smooth transitions
6. **Particle Background**: Interactive canvas-based particle system
7. **Contact Forms**: Integration with external webhooks for lead capture

### Backend Components
1. **API Routes**: RESTful endpoints for blog management and file uploads
2. **Labs Storage**: Database layer for blog post CRUD operations
3. **Image Upload**: Secure file handling with validation and storage
4. **Admin Authentication**: Simple localStorage-based admin access

### Database Schema
- **Users Table**: Basic user management (id, username, password)
- **Posts Table**: Blog posts with rich content (id, title, content, image_url, video_url, published, timestamps)

## Data Flow

1. **Content Delivery**: Static pages served with dynamic content loading
2. **Blog System**: Posts fetched from API endpoints with real-time updates
3. **Image Management**: Upload flow through dedicated endpoints with validation
4. **User Interactions**: Newsletter subscriptions and contact forms via external webhooks
5. **Admin Operations**: CRUD operations for blog posts with role-based access

## External Dependencies

### Core Libraries
- React ecosystem: react, react-dom, @types/react
- Animation: framer-motion for advanced UI animations
- Styling: tailwindcss, postcss, autoprefixer
- Icons: remixicon for consistent iconography
- UI Components: @radix-ui/* for accessible primitives

### Backend Dependencies
- Express.js with TypeScript support
- Drizzle ORM with PostgreSQL adapter
- Multer for file upload handling
- Neon Database serverless connection
- Various utility libraries for validation and error handling

### Development Tools
- Vite for fast development and building
- ESBuild for server-side bundling
- TypeScript for type safety
- Replit-specific plugins for development environment

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- Express server with TypeScript compilation via tsx
- Database connection to Neon PostgreSQL instance
- Real-time development with Replit integration

### Production Build
- Frontend: Vite build generates optimized static assets
- Backend: ESBuild bundles server code for Node.js runtime
- Database: Drizzle migrations handle schema updates
- Deployment: Single application serving both frontend and API

### Environment Configuration
- Database URL required for PostgreSQL connection
- File upload directory managed automatically
- Session storage configured for admin authentication
- Static asset serving for uploaded images

## Changelog

```
Changelog:
- July 23, 2025. Complete rebranding from "Innovapymes" to "Jose Bustos" personal brand
  - Eliminated Services and Verticals pages, keeping only Portfolio (renamed from Labs)
  - Updated navigation structure: Home -> Portfolio -> Contact
  - Changed API routes from /api/labs to /api/portfolio
  - Updated all content to first-person singular for personal branding
  - Added new contact information and social media links
- July 08, 2025. Initial setup
```

## User Preferences

Preferred communication style: Simple, everyday language.