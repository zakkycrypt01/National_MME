# Firebase Firestore - Quick Reference

## Common Operations

### Reading Data (Server-side only)

```typescript
import { getLandingData, getDashboardData } from '@/lib/data';

// In API routes or Server Components
export async function GET() {
  const data = await getLandingData();
  return NextResponse.json(data);
}
```

### Updating Data via Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database**
4. Find collection: `site-data`
5. Click on document: `landing` or `dashboard`
6. Edit fields directly in the UI

### Updating Data via Script

Create a new script in `scripts/` directory:

```javascript
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();

async function updateData() {
  // Update specific fields
  await db.collection('site-data').doc('landing').update({
    'hero.title': 'New Title',
  });
  
  console.log('Updated successfully!');
}

updateData();
```

### Firestore Security Rules

Production-ready security rules example:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for site data
    match /site-data/{document} {
      allow read: if true;
      allow write: if false; // Only allow writes via Admin SDK
    }
    
    // User-specific data (if you add user collections later)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Data Structure Reference

### Collection: `site-data`

```
site-data/
├── landing
│   ├── site: { name, description, logo }
│   ├── hero: { title, subtitle, cta, image }
│   ├── trustBar: { title, partners[] }
│   ├── network: { title, description, stats, schools[] }
│   ├── certificate: { title, description, features[] }
│   ├── internships: { title, description, opportunities[] }
│   ├── news: { title, items[] }
│   └── council: { title, description, members[] }
│
└── dashboard
    ├── user: { name, email, avatar, university, etc }
    ├── stats: [{ label, value }]
    ├── chapters: [{ id, name, state, etc }]
    └── partners: { title, description, organizations[] }
```

## Environment Variables

Required in `.env.local`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Useful Commands

```bash
# Install dependencies
npm install

# Migrate data to Firestore
node scripts/migrate-to-firestore.js

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Issue: Data not loading
**Solution**: Check browser console and server logs. Verify Firebase credentials in `.env.local`

### Issue: PERMISSION_DENIED error
**Solution**: Update Firestore security rules to allow public read access for `site-data` collection

### Issue: Invalid private key
**Solution**: Ensure `FIREBASE_PRIVATE_KEY` is wrapped in quotes and contains `\n` characters

### Issue: Module not found error
**Solution**: Run `npm install` to ensure all dependencies are installed

## API Endpoints

- `GET /api/landing` - Returns all landing page data
- `GET /api/dashboard` - Returns all dashboard data
- `GET /api/chapters` - Returns list of chapters
- `GET /api/chapters/[id]` - Returns specific chapter details
- `GET /api/partners` - Returns partners data
- `GET /api/internships` - Returns internship opportunities
- `GET /api/news` - Returns news items
- `GET /api/council` - Returns council members

## Performance Tips

1. **Use Server Components** when possible - they fetch data directly from Firestore
2. **Cache responses** in API routes using Next.js caching:
   ```typescript
   export const revalidate = 3600; // Cache for 1 hour
   ```
3. **Index frequently queried fields** in Firestore
4. **Use Firestore's offline persistence** for better UX (client-side SDK)

## Backup Strategy

### Manual Backup
```bash
# Export Firestore data
gcloud firestore export gs://[BUCKET_NAME]/[EXPORT_PREFIX]

# Import Firestore data
gcloud firestore import gs://[BUCKET_NAME]/[EXPORT_PREFIX]
```

### Automated Backup
Set up scheduled exports in Google Cloud Console:
1. Go to Cloud Firestore → Import/Export
2. Set up Cloud Scheduler for automatic backups

## Next Steps

- [ ] Set up proper Firestore security rules
- [ ] Enable Firebase Authentication for user login
- [ ] Add admin panel for data management
- [ ] Set up automated backups
- [ ] Monitor Firebase usage and costs
- [ ] Implement Firestore indexes for complex queries
