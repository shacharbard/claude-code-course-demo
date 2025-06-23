# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application bootstrapped with `create-next-app`, using the App Router architecture. The project is configured with TypeScript, Tailwind CSS v4, and shadcn/ui components with the "new-york" style.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Run linting**: `npm run lint`

The development server runs on http://localhost:3000 by default.

## Architecture & Structure

### App Router Structure
- Uses Next.js 15 App Router (`app/` directory)
- `app/layout.tsx`: Root layout with Geist fonts and global CSS
- `app/page.tsx`: Main landing page component
- `app/globals.css`: Global Tailwind styles with design system tokens

### Styling System
- **Tailwind CSS v4**: Modern Tailwind configuration with `@import "tailwindcss"`
- **Design tokens**: Comprehensive CSS custom properties for colors, spacing, and themes
- **Dark mode**: Built-in dark theme support with `.dark` class
- **shadcn/ui ready**: Configured for shadcn/ui components with "new-york" style

### Key Files
- `components.json`: shadcn/ui configuration
- `lib/utils.ts`: Utility functions including `cn()` for class merging
- `tsconfig.json`: TypeScript config with `@/*` path alias for root imports

### Dependencies
- **UI**: shadcn/ui ecosystem (class-variance-authority, clsx, tailwind-merge, lucide-react)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4 with tw-animate-css

## Development Notes

### Component Patterns
- Uses TypeScript with strict mode enabled
- Import paths use `@/` alias for root-level imports
- shadcn/ui components should be placed in `@/components/ui/`
- Custom utilities go in `@/lib/utils.ts`

### Styling Conventions
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Design system uses OKLCH color space for better color accuracy
- CSS custom properties are defined in `app/globals.css` for consistent theming

### Coding Best Practices
- Always use descriptive variable names.