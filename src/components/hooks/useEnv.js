import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.development.local' });

export function useEnv() {
  const apiUrl = process.env.VERCEL_URL || 'http://localhost:3000';

  return { apiUrl }; 
} 