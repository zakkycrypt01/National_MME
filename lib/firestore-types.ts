/**
 * TypeScript type definitions for Firestore data structure
 */

// Landing page data structure
export interface LandingData {
  site: {
    name: string;
    description: string;
    logo: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: {
      primary: string;
      secondary: string;
    };
    image: string;
  };
  trustBar: {
    title: string;
    partners: Array<{
      name: string;
      logo: string;
    }>;
  };
  network: {
    title: string;
    description: string;
    stats: {
      universities: number;
      members: number;
      states: number;
    };
    schools: Array<{
      id: number;
      name: string;
      state: string;
      abbreviation: string;
      members: number;
      established: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    }>;
  };
  certificate: {
    title: string;
    description: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  internships: {
    title: string;
    description: string;
    opportunities: Array<{
      id: number;
      company: string;
      logo: string;
      position: string;
      location: string;
      type: string;
      deadline: string;
      description: string;
    }>;
  };
  news: {
    title: string;
    items: Array<{
      id: number;
      title: string;
      excerpt: string;
      date: string;
      category: string;
      image: string;
      author: {
        name: string;
        avatar: string;
      };
    }>;
  };
  council: {
    title: string;
    description: string;
    members: Array<{
      id: number;
      name: string;
      position: string;
      image: string;
      bio: string;
    }>;
  };
}

// Dashboard data structure
export interface DashboardData {
  user: {
    name: string;
    email: string;
    avatar: string;
    university: string;
    membershipId: string;
    memberSince: string;
  };
  stats: Array<{
    label: string;
    value: string;
  }>;
  chapters: Array<{
    id: number;
    name: string;
    state: string;
    abbreviation: string;
    members: number;
    established: string;
    image: string;
    description: string;
    activities: string[];
    contact: {
      email: string;
      phone: string;
    };
    executives: Array<{
      name: string;
      position: string;
      image: string;
    }>;
  }>;
  partners: {
    title: string;
    description: string;
    organizations: Array<{
      id: number;
      name: string;
      logo: string;
      description: string;
      website: string;
      benefits: string[];
    }>;
  };
}

// Firestore collection names
export const COLLECTIONS = {
  SITE_DATA: 'site-data',
} as const;

// Firestore document IDs
export const DOCUMENTS = {
  LANDING: 'landing',
  DASHBOARD: 'dashboard',
} as const;
