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
      detectSessionInUrl: true,
      storage: localStorage,
      storageKey: 'zeno-auth-token',
      flowType: 'pkce',
    },
    global: {
      headers: {
        'x-session-length': '864000', // 10 days in seconds
      },
    },
  }
);

// Handle auth state changes
supabase.auth.onAuthStateChange((event: 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'TOKEN_REFRESH_FAILED', session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token was refreshed successfully');
  }
  
  if (event === 'SIGNED_OUT') {
    localStorage.removeItem('zeno-auth-token');
  }

  // Handle refresh token errors and redirect to login
  if (event === 'TOKEN_REFRESH_FAILED') {
    console.error('Token refresh failed');
    localStorage.removeItem('zeno-auth-token');
    window.location.href = '/login/referrer';
  }
});