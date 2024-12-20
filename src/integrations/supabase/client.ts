import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://twfdhyqwcjpcolvebeml.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3ZmRoeXF3Y2pwY29sdmViZW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwOTQwNDYsImV4cCI6MjA0OTY3MDA0Nn0.D0dH0NaPbJaqEE4OeMICkavYQVMBa_n0i4lo9CB6_So";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Handle auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token was refreshed successfully');
  }

  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.email);
  }

  if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
});

export default supabase;