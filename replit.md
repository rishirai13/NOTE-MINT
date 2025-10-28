# NOTE-MINT

## Overview

NOTE-MINT is a premium, privacy-focused note-taking web application with instant PDF export capabilities. The application emphasizes a minimalist design philosophy inspired by modern productivity tools like Notion and Linear, combined with Apple's Human Interface Guidelines. Built as a single-page application using React and TypeScript, it provides a blazing-fast, ultra-private experience where all notes are stored only in session storage and automatically cleared when the browser is closed or refreshed.

The application features a polished landing page that introduces users to the NOTE-MINT brand and a focused note-taking interface with real-time search, filtering, and client-side PDF generation. The entire application runs in-browser with zero server communication for core functionalities, ensuring complete user privacy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Client-side routing using Wouter for lightweight navigation
- Component-based architecture with reusable UI primitives from Radix UI

**State Management**
- React Context API for theme management (light/dark mode)
- Local component state with React hooks for note management
- TanStack Query (React Query) for potential future API integration
- Session storage for temporary note persistence (cleared on tab/browser close)

**UI Component System**
- Shadcn/ui component library based on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- CSS custom properties for theming (light/dark mode support)
- Responsive design with mobile-first approach
- Typography system using Inter (UI), Poppins (headings), and Roboto Mono (timestamps)

**Design System**
- Premium minimalist aesthetic with refined spacing system (2, 4, 8, 12, 16, 24, 32px units)
- Neutral color palette with HSL-based theming
- Smooth micro-interactions and animations for all interactive elements
- Glass-morphism effects and subtle shadows for depth
- WCAG AAA color contrast standards for accessibility

### Key Features & Modules

**Landing Page**
- Hero section with brand presentation and call-to-action
- Feature showcase highlighting privacy, speed, and PDF export
- Theme toggle for light/dark mode preference
- Smooth transitions to main application interface

**Note-Taking Interface**
- Textarea-based editor with ARIA attributes for accessibility
- Real-time note saving to session storage
- Notes list sidebar showing saved notes with preview snippets and timestamps
- Search/filter functionality for finding notes within the session
- Edit and delete operations for saved notes

**PDF Export**
- Client-side PDF generation using jsPDF library
- Instant export without server communication
- No data persistence beyond the current session

**Accessibility Features**
- Semantic HTML5 structure (header, nav, main, section, footer)
- Keyboard navigation support with visible focus indicators
- ARIA landmarks and labels throughout the interface
- Screen reader compatible components

### Data Storage Strategy

**Session-Only Storage**
- All notes stored exclusively in browser's sessionStorage
- Automatic data clearing when tab/browser is closed or refreshed
- No persistent storage or server-side data retention
- Theme preference stored in localStorage for persistence across sessions

**Privacy-First Approach**
- Zero server communication for note operations
- No tracking or analytics
- Complete data isolation to user's browser session

### Backend Architecture

**Express Server Setup**
- Express.js server for serving the built application
- Vite development server integration with HMR (Hot Module Replacement)
- Minimal API surface - currently no active API routes
- Session management infrastructure available but unused for core features

**Database Configuration**
- Drizzle ORM configured for PostgreSQL (via Neon Database serverless)
- Schema defined for potential user authentication (users table)
- Database setup available but not utilized for core note-taking functionality
- Migration system configured with drizzle-kit

**Planned Authentication (Not Currently Implemented)**
- User schema with username/password fields
- UUID-based user identification
- In-memory storage implementation available as fallback

## External Dependencies

### Core Libraries
- **React & React DOM**: UI framework for component-based architecture
- **TypeScript**: Type-safe development environment
- **Vite**: Modern build tool and development server
- **Express**: Node.js web application framework for serving the application

### UI Component Libraries
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives (@radix-ui/react-*)
- **Shadcn/ui**: Component library built on top of Radix UI with Tailwind styling
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for managing component variants
- **clsx & tailwind-merge**: Utilities for conditional and merged class names

### Data & State Management
- **TanStack Query**: Powerful data synchronization library for React
- **React Hook Form**: Form state management with validation
- **Zod**: TypeScript-first schema validation
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **Drizzle Zod**: Integration between Drizzle and Zod for schema validation

### PDF Generation
- **jsPDF**: Client-side PDF generation library for exporting notes

### Database & Backend
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **connect-pg-simple**: PostgreSQL session store for Express (configured but not actively used)
- **PostgreSQL**: Relational database (configured via Neon Database)

### Development Tools
- **Wouter**: Lightweight routing library for React
- **date-fns**: Modern date utility library
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation enhancement
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Design & Fonts
- **Google Fonts**: Inter, Poppins, and Roboto Mono font families loaded via CDN