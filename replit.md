# ResumeAI Pro - AI-Powered Resume Builder

## Overview

ResumeAI Pro is a modern full-stack web application that helps users create professional, ATS-optimized resumes using artificial intelligence. The application features a conversational AI assistant, template selection, real-time editing, and comprehensive resume analysis tools.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with custom design system
- **Component Library**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: React Router for client-side navigation
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **API Design**: RESTful API structure with `/api` prefix

### Build & Development
- **Development**: Vite dev server with HMR and React Fast Refresh
- **Production**: esbuild for server bundling, Vite for client bundling
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Development Tools**: Runtime error overlay, Replit-specific tooling

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe database schema definitions in `/shared/schema.ts`
- **Migrations**: Database migrations managed in `/migrations` directory
- **Connection**: Neon serverless PostgreSQL with connection pooling

### Authentication & Storage
- **User Management**: Basic user schema with username/password authentication
- **Session Storage**: PostgreSQL-backed session store for persistent sessions
- **Data Storage**: In-memory storage interface with extensible CRUD operations

### UI Components
- **Design System**: Professional color scheme with CSS custom properties
- **Component Library**: Comprehensive set of reusable UI components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: ARIA-compliant components from Radix UI

### Resume Building Features
- **Template System**: Multiple professional resume templates
- **AI Assistant**: Conversational AI for resume guidance and optimization
- **ATS Analysis**: Resume scoring and optimization suggestions
- **PDF Export**: Client-side PDF generation with html2pdf.js
- **Real-time Preview**: Live preview of resume changes

## Data Flow

1. **User Registration/Login**: User data stored in PostgreSQL with session management
2. **Template Selection**: Users choose from pre-designed templates
3. **Content Input**: Form-based data collection with validation
4. **AI Processing**: AI analysis and suggestions for content optimization
5. **ATS Scoring**: Real-time analysis of resume ATS compatibility
6. **Export**: PDF generation and download functionality

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web server framework
- **react**: Frontend framework
- **@tanstack/react-query**: Server state management
- **tailwindcss**: Utility-first CSS framework

### UI Dependencies
- **@radix-ui/***: Accessible component primitives
- **lucide-react**: Icon library
- **class-variance-authority**: Type-safe CSS class variants
- **tailwind-merge**: Utility for merging Tailwind classes

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking and compilation
- **esbuild**: Fast JavaScript bundler for production
- **drizzle-kit**: Database migration and introspection tools

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: Neon PostgreSQL development database
- **Environment Variables**: `DATABASE_URL` for database connection

### Production Build
- **Client Build**: Vite builds optimized static assets to `/dist/public`
- **Server Build**: esbuild bundles server code to `/dist/index.js`
- **Database Migrations**: Drizzle Kit manages schema changes
- **Static Assets**: Served from Express server in production

### Environment Configuration
- **Development**: `NODE_ENV=development` with tsx for TypeScript execution
- **Production**: `NODE_ENV=production` with compiled JavaScript
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```