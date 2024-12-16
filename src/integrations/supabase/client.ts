import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { AuthChangeEvent } from '@supabase/supabase-js';

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
supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token was refreshed successfully');
  }
  
  if (event === 'SIGNED_OUT') {
    localStorage.removeItem('zeno-auth-token');
  }

  // Handle refresh token errors
  if (event === 'USER_DELETED' || event === 'SIGNED_OUT') {
    console.error('Token refresh failed');
    localStorage.removeItem('zeno-auth-token');
    window.location.href = '/login/referrer';
  }
});