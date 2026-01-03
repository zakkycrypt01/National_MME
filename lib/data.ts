import { db } from './firebase';

/**
 * Get document from Firestore
 */
export async function getFirestoreDocument(collection: string, document: string): Promise<any> {
  try {
    const docRef = db.collection(collection).doc(document);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      throw new Error(`Document ${document} not found in ${collection}`);
    }
    
    const data = docSnap.data();
    if (!data) {
      throw new Error(`Document ${document} has no data`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error reading ${collection}/${document}:`, error);
    throw new Error(`Failed to read ${collection}/${document}`);
  }
}

/**
 * Get landing page data
 */
export async function getLandingData() {
  return await getFirestoreDocument('site-data', 'landing');
}

/**
 * Get dashboard data
 */
export async function getDashboardData() {
  return await getFirestoreDocument('site-data', 'dashboard');
}

/**
 * Get chapters data
 */
export async function getChaptersData() {
  const data = await getDashboardData();
  return data.chapters || [];
}

/**
 * Get a specific chapter by ID
 */
export async function getChapterById(id: number) {
  const chapters = await getChaptersData();
  return chapters.find((chapter: any) => chapter.id === id);
}

/**
 * Get partners/professional bodies data
 */
export async function getPartnersData() {
  const data = await getDashboardData();
  return data.partners || {};
}

/**
 * Get internships data
 */
export async function getInternshipsData() {
  const data = await getLandingData();
  return data.internships || {};
}

/**
 * Get news data
 */
export async function getNewsData() {
  const data = await getLandingData();
  return data.news || {};
}

/**
 * Get council data
 */
export async function getCouncilData() {
  const data = await getLandingData();
  return data.council || {};
}

/**
 * Get network/schools data
 */
export async function getNetworkData() {
  const data = await getLandingData();
  return data.network || {};
}

/**
 * Get site configuration
 */
export async function getSiteConfig() {
  const data = await getLandingData();
  return data.site || {};
}

/**
 * Get user data
 */
export async function getUserData() {
  const data = await getDashboardData();
  return data.user || {};
}
