import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Environment Variables:', {
  REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY?.slice(0, 10) + '...',
});

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  });
  throw new Error('Please check your environment variables. Missing Supabase configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);