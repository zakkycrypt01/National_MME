#!/usr/bin/env node

/**
 * Migration script to upload JSON data to Firestore
 * 
 * Usage: node scripts/migrate-to-firestore.js
 * 
 * This script will:
 * 1. Read landing.json and dashboard.json files
 * 2. Upload them to Firestore in the 'site-data' collection
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs').promises;
const path = require('path');

// Check for required environment variables
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error('❌ Missing Firebase credentials in environment variables');
  console.error('Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY');
  process.exit(1);
}

// Initialize Firebase Admin
try {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  console.log('✅ Firebase Admin initialized');
} catch (error) {
  console.error('❌ Error initializing Firebase:', error.message);
  process.exit(1);
}

const db = getFirestore();

async function migrateData() {
  try {
    console.log('\n🚀 Starting migration...\n');

    // Read landing.json
    console.log('📖 Reading landing.json...');
    const landingPath = path.join(process.cwd(), 'data', 'landing.json');
    const landingData = JSON.parse(await fs.readFile(landingPath, 'utf8'));
    
    // Upload to Firestore
    console.log('📤 Uploading landing data to Firestore...');
    await db.collection('site-data').doc('landing').set(landingData);
    console.log('✅ Landing data uploaded successfully\n');

    // Read dashboard.json
    console.log('📖 Reading dashboard.json...');
    const dashboardPath = path.join(process.cwd(), 'data', 'dashboard.json');
    const dashboardData = JSON.parse(await fs.readFile(dashboardPath, 'utf8'));
    
    // Upload to Firestore
    console.log('📤 Uploading dashboard data to Firestore...');
    await db.collection('site-data').doc('dashboard').set(dashboardData);
    console.log('✅ Dashboard data uploaded successfully\n');

    console.log('🎉 Migration completed successfully!');
    console.log('\nData structure in Firestore:');
    console.log('  site-data/');
    console.log('    ├── landing');
    console.log('    └── dashboard');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
