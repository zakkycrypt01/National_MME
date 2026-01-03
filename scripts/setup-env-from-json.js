#!/usr/bin/env node

/**
 * Helper script to generate .env.local from Firebase service account JSON
 * 
 * Usage: node scripts/setup-env-from-json.js path/to/service-account.json
 */

const fs = require('fs');
const path = require('path');

// Get JSON file path from command line argument
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.error('❌ Please provide the path to your Firebase service account JSON file');
  console.error('Usage: node scripts/setup-env-from-json.js path/to/service-account.json');
  process.exit(1);
}

// Check if file exists
if (!fs.existsSync(jsonFilePath)) {
  console.error(`❌ File not found: ${jsonFilePath}`);
  process.exit(1);
}

try {
  // Read and parse the service account JSON
  const serviceAccount = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  
  // Extract required fields
  const projectId = serviceAccount.project_id;
  const clientEmail = serviceAccount.client_email;
  const privateKey = serviceAccount.private_key;
  
  if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ Invalid service account JSON. Missing required fields.');
    process.exit(1);
  }
  
  // Create .env.local content
  const envContent = `# Firebase Configuration
FIREBASE_PROJECT_ID=${projectId}
FIREBASE_CLIENT_EMAIL=${clientEmail}
FIREBASE_PRIVATE_KEY="${privateKey.replace(/\n/g, '\\n')}"
`;
  
  // Write to .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ Successfully created .env.local with Firebase credentials');
  console.log('\nGenerated environment variables:');
  console.log(`FIREBASE_PROJECT_ID=${projectId}`);
  console.log(`FIREBASE_CLIENT_EMAIL=${clientEmail}`);
  console.log(`FIREBASE_PRIVATE_KEY=<hidden>`);
  console.log('\n✨ You can now run: node scripts/migrate-to-firestore.js');
  
} catch (error) {
  console.error('❌ Error processing service account JSON:', error.message);
  process.exit(1);
}
