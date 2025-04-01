# Softball League Draft App

## Project Overview

The Softball League Draft App is a real-time web application designed to facilitate player drafts for softball leagues. The application provides a seamless, role-based experience for administrators, team managers, and spectators, allowing for organized and transparent player selection.

## Purpose

This application solves the common challenges faced during league drafts:
- Centralizes the draft process in a single, accessible platform
- Provides real-time updates to all participants and viewers
- Enforces draft rules and team assignments
- Creates a permanent record of draft selections
- Eliminates confusion about player availability and draft order

## Tech Stack

- **Frontend**: Next.js with App Router
- **Styling**: TailwindCSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting/Deployment**: Vercel
- **Real-time Updates**: Supabase Realtime

## Key Features

- **Live Draft Board**: Real-time updates visible to all users
- **Role-Based Access Control**:
  - **Administrators**: Can manage teams, players, and draft for any team
  - **Team Managers**: Can draft only for their assigned team
  - **Viewers**: Can watch the draft in real-time without authentication
- **Draft Management**: Sequential draft picks with validation
- **Player Database**: Searchable player information with positions and stats
- **Team Management**: Team creation and manager assignment

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin-only sections
│   │   ├── players/      # Player management
│   │   └── teams/        # Team management
│   ├── draft/            # Draft interface
│   │   └── team/[teamId] # Team-specific draft view
│   ├── login/            # Authentication pages
│   └── page.tsx          # Public draft board (home page)
├── components/           # Reusable React components
│   ├── auth/             # Authentication components
│   ├── draft/            # Draft-related components
│   ├── layout/           # Layout components (header, footer)
│   └── ui/               # UI components (buttons, cards, etc.)
├── lib/                  # Utility functions and shared code
│   ├── supabase.ts       # Supabase client
│   └── types.ts          # TypeScript type definitions
└── hooks/                # Custom React hooks
    ├── useAuth.ts        # Authentication hooks
    └── useDraft.ts       # Draft-related hooks
```

## Data Models

### Users
- `id`: UUID (primary key)
- `email`: String (unique)
- `role`: String (admin, manager, viewer)

### Teams
- `id`: UUID (primary key)
- `name`: String
- `manager_id`: UUID (foreign key to users)

### Players
- `id`: UUID (primary key)
- `name`: String
- `position`: String
- `stats`: JSON
- `available`: Boolean

### Draft Picks
- `id`: UUID (primary key)
- `team_id`: UUID (foreign key to teams)
- `player_id`: UUID (foreign key to players)
- `pick_number`: Integer
- `timestamp`: Timestamp

## Authentication and Authorization

The application uses Supabase Authentication with row-level security policies:

- Public access is allowed to view the draft board
- Protected routes require authentication
- Row-level security ensures managers can only draft for their own teams
- Admin users have full access to all functions

## Getting Started

### Prerequisites
- Node.js (v14.6.0 or newer)
- npm or yarn
- Supabase account

### Local Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Supabase Setup

1. Create a new Supabase project
2. Set up the database tables as described in the Data Models section
3. Configure authentication providers
4. Set up row-level security policies
5. Copy the API URL and anon key to your environment variables

## Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy from the main branch

## Development Workflow

1. Create feature branches from `main`
2. Implement features or fixes
3. Submit pull requests to `main`
4. Automatic deployment will occur after merging to `main`

## Future Enhancements

- Draft timer with automatic selection
- Draft history and statistics
- Player photos and detailed profiles
- Mock draft functionality
- Mobile application

---

This project combines modern web technologies to create a lightweight yet powerful solution for softball league drafts, prioritizing real-time functionality, ease of use, and proper authorization controls.