# Firebase Firestore Setup Guide

This project uses Firebase Firestore as the database to store all site data.

## Prerequisites

1. **Firebase Project**: You need a Firebase project with Firestore enabled
2. **Service Account**: Download service account credentials from Firebase Console

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Enable Firestore Database:
   - Go to Build → Firestore Database
   - Click "Create database"
   - Choose "Start in production mode" or "Test mode"
   - Select a location (e.g., us-central)

### 2. Generate Service Account Key

1. In Firebase Console, go to Project Settings (⚙️ icon)
2. Navigate to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file (keep it secure!)

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open the downloaded service account JSON file and fill in `.env.local`:
   ```env
   FIREBASE_PROJECT_ID=your-project-id-from-json
   FIREBASE_CLIENT_EMAIL=your-service-account-email-from-json
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key from json (keep the \n characters)\n-----END PRIVATE KEY-----\n"
   ```

   Example from service account JSON:
   ```json
   {
     "project_id": "my-project-123",
     "client_email": "firebase-adminsdk-xxxxx@my-project-123.iam.gserviceaccount.com",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
   }
   ```

### 4. Migrate Data to Firestore

Run the migration script to upload your JSON data to Firestore:

```bash
node scripts/migrate-to-firestore.js
```

This will create the following structure in Firestore:
```
site-data (collection)
├── landing (document) - Contains all landing page data
└── dashboard (document) - Contains all dashboard data
```

### 5. Verify Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for any errors
3. Verify data loads correctly on the landing page and dashboard

## Firestore Data Structure

### Collection: `site-data`

#### Document: `landing`
Contains all landing page data including:
- `site`: Site configuration (name, description, logo)
- `hero`: Hero section content
- `trustBar`: Partner logos
- `network`: School/chapter network data with coordinates
- `certificate`: Certificate section content
- `internships`: Internship opportunities
- `news`: News and updates
- `council`: Council members information

#### Document: `dashboard`
Contains all dashboard data including:
- `user`: User profile information
- `stats`: Dashboard statistics
- `chapters`: List of all chapters with details
- `partners`: Professional bodies and partners
- Additional dashboard-specific data

## Troubleshooting

### Error: "no such file or directory, open 'data/landing.json'"
- The app is trying to read from local files instead of Firestore
- Make sure `.env.local` exists and contains correct Firebase credentials
- Restart the development server after adding environment variables

### Error: "PERMISSION_DENIED"
- Check Firestore security rules
- For development, you can use test mode rules:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
  ```
- **Important**: Use proper security rules in production!

### Error: "Invalid credentials"
- Verify `FIREBASE_PRIVATE_KEY` is properly formatted with `\n` characters
- Make sure quotes are correct in `.env.local`
- Check that project ID and client email match your service account

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Never share your service account key publicly**
3. **Use proper Firestore security rules in production**
4. **Restrict API keys in Firebase Console** (Settings → API restrictions)
5. **Enable App Check** for additional security (optional)

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

2. Make sure Firestore security rules are properly configured

3. Consider enabling Firebase App Check for additional security

## Updating Data

To update data in Firestore:

1. **Option 1 - Firebase Console**:
   - Go to Firestore Database in Firebase Console
   - Navigate to `site-data` collection
   - Click on `landing` or `dashboard` document
   - Edit fields directly

2. **Option 2 - Update JSON and Re-migrate**:
   - Edit `data/landing.json` or `data/dashboard.json`
   - Run migration script again: `node scripts/migrate-to-firestore.js`
   - This will overwrite existing data

3. **Option 3 - Build an Admin Panel** (Future enhancement):
   - Create admin routes in your Next.js app
   - Add forms to update Firestore directly from the UI

## Additional Resources

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
