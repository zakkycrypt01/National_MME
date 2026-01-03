# National Student Association

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/abdullahi-usmans-projects-58e45ce7/v0-national-student-association)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/dyNuixiGyhS)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/abdullahi-usmans-projects-58e45ce7/v0-national-student-association](https://vercel.com/abdullahi-usmans-projects-58e45ce7/v0-national-student-association)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/dyNuixiGyhS](https://v0.app/chat/dyNuixiGyhS)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Prerequisites

Before running this project, you need to:

1. **Set up Firebase Firestore** - This project uses Firestore as the database
2. **Configure environment variables** - Firebase credentials are required

📚 **See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions**

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd National_MME
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
   - Create a Firebase project
   - Download service account credentials
   - Configure `.env.local` with Firebase credentials

4. **Migrate data to Firestore**
   ```bash
   node scripts/migrate-to-firestore.js
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - React components
- `/lib` - Utility functions and Firebase configuration
- `/data` - JSON data files (for reference/migration)
- `/scripts` - Utility scripts including Firestore migration
- `/public` - Static assets

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Maps**: Leaflet & React Leaflet
- **Language**: TypeScript
