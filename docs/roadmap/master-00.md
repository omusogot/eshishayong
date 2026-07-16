You are a Senior Full Stack Software Architect.

Build a production-ready Learning Management System (LMS) named "Eshishayong" as a single monolithic application optimized for rapid hackathon development, clean architecture, minimal complexity, and low AI token consumption.

## Technical Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- Prisma ORM
- PostgreSQL
- Auth.js (NextAuth) with JWT sessions
- Zod
- React Hook Form
- Chart.js
- Framer Motion
- TipTap Editor
- Docker + Docker Compose

## Architecture
- Single monolithic repository.
- Frontend and backend in one Next.js application.
- API Routes and Server Actions only.
- No microservices.
- No Supabase.
- No Firebase.
- No Lovable Cloud.
- Keep the codebase modular, simple, and easy to maintain.

## Application Name
Eshishayong

## Branding
Use the following design system:
- Cream (#FDF6E3)
- Mustard (#E6A532)
- Orange (#E86A33)
- Red (#C23B22)
- Charcoal (#1A1A1A)
- Rounded modern typography
- Mobile-first responsive design
- Accessible UI with dark mode support

Create an Admin Branding module that allows:
- Uploading Logo, Dark Logo, and Favicon.
- Editing footer text (e.g., "Developed by ..."), displayed consistently across all pages, certificates, reports, login screen, and dashboards.
- Managing primary, secondary, and accent theme colors.

## Authentication & Roles
Implement Auth.js with JWT and RBAC for:
- Admin
- Instructor
- Student
- Expert

Include login, registration, password reset, and profile management.

## Modules
Implement:
- Dashboard
- User Management
- Branding & Settings
- Course Management
- Categories
- Lessons
- Resources
- Quizzes
- Enrollment
- Learning Progress
- Gamification (coins, XP, badges, leaderboard)
- Certificates
- Innovation Hub (discussion forum)
- Reports & Analytics
- Audit Logs

## Database
Use Prisma with PostgreSQL and create models for:
Users, Roles, Branding, Settings, Courses, Categories, Lessons, Resources, Quizzes, Questions, Enrollments, Progress, Badges, Leaderboards, Certificates, and Audit Logs.

## LMS Content
Seed the database with realistic sample content based on:
- Digital Literacy
- Social Media Marketing
- Agribusiness
- Digital Accounting
- Smartphone Photography
- Virtual Assistance
- Basic Web Development
- Warehouse Management

Generate realistic lesson titles, descriptions, quizzes, badges, and certificates inspired by standard LMS content aligned with SDG 1, SDG 2, and SDG 9.

## Admin Dashboard
Provide CRUD operations for all modules, dashboard statistics, charts, user activity, course analytics, and branding management.

## Deployment
Provide:
- Dockerfile
- docker-compose.yml
- Prisma migrations
- Seed script
- Environment configuration
- Production-ready folder structure

## Coding Standards
- Keep components small and reusable.
- Use Prisma for all database access.
- Validate all forms with Zod.
- Use Server Actions where appropriate.
- Avoid unnecessary abstractions.
- Write clean, readable TypeScript.
- Organize features by module.
- Include comments only where they add value.
- Ensure the application runs with `docker compose up` and is ready for further feature expansion.