import { createClient } from '@supabase/supabase-js';

/**
 * Sparti CMS Supabase Client
 * 
 * Configured for multi-tenant CMS operations with automatic
 * session management and RLS (Row Level Security) support.
 */

// Environment variables - these should be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// Create Supabase client with optimized settings for CMS usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Automatically refresh tokens
    autoRefreshToken: true,
    
    // Persist session in localStorage
    persistSession: true,
    
    // Detect session from URL (useful for magic links)
    detectSessionInUrl: true,
    
    // Storage key for session persistence
    storageKey: 'sparti-cms-auth',
  },
  
  // Global settings
  global: {
    headers: {
      'X-Client-Info': 'sparti-cms@1.0.0',
    },
  },
  
  // Database settings
  db: {
    schema: 'public',
  },
  
  // Real-time settings (if needed for collaborative editing)
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

/**
 * Authentication Helper Functions
 */

// Get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }
  return user;
};

// Get current session
export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting current session:', error);
    return null;
  }
  return session;
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
  
  return data;
};

// Sign up with email and password
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
  
  return data;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Sign out failed: ${error.message}`);
  }
};

/**
 * RLS Helper Functions
 * 
 * These functions work with the RLS helpers created in migrations
 */

// Get current tenant ID (uses RLS helper function)
export const getCurrentTenantId = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase.rpc('get_current_tenant_id');
    
    if (error) {
      console.error('Error getting tenant ID:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error calling get_current_tenant_id:', error);
    return null;
  }
};

// Check if current user has a specific role
export const userHasRole = async (role: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('user_has_role', { role_name: role });
    
    if (error) {
      console.error('Error checking user role:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error calling user_has_role:', error);
    return false;
  }
};

// Check if current user is admin
export const isCurrentUserAdmin = async (): Promise<boolean> => {
  return await userHasRole('admin');
};

// Check if current user can edit content
export const canCurrentUserEdit = async (): Promise<boolean> => {
  const isAdmin = await userHasRole('admin');
  const isEditor = await userHasRole('editor');
  return isAdmin || isEditor;
};

/**
 * Database Helper Functions
 */

// Execute a query with automatic error handling
export const executeQuery = async <T>(
  queryBuilder: any,
  operation: string = 'query'
): Promise<T> => {
  try {
    const { data, error } = await queryBuilder;
    
    if (error) {
      console.error(`Database ${operation} error:`, error);
      throw new Error(`${operation} failed: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error executing ${operation}:`, error);
    throw error;
  }
};

// Get table reference with automatic RLS
export const getTable = (tableName: string) => {
  return supabase.from(tableName);
};

/**
 * Real-time Subscription Helpers
 */

// Subscribe to schema changes
export const subscribeToSchemaChanges = (
  callback: (payload: any) => void,
  schemaName?: string
) => {
  let channel = supabase
    .channel('schema-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'cms_schemas',
        filter: schemaName ? `schema_name=eq.${schemaName}` : undefined,
      },
      callback
    );

  return channel.subscribe();
};

// Subscribe to section changes
export const subscribeToSectionChanges = (
  callback: (payload: any) => void,
  schemaId?: string
) => {
  let channel = supabase
    .channel('section-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'cms_schema_sections',
        filter: schemaId ? `schema_id=eq.${schemaId}` : undefined,
      },
      callback
    );

  return channel.subscribe();
};

/**
 * Error Handling
 */

export class SpartiCMSError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'SpartiCMSError';
  }
}

// Handle Supabase errors consistently
export const handleSupabaseError = (error: any, operation: string): never => {
  console.error(`Supabase ${operation} error:`, error);
  
  // Map common Supabase errors to user-friendly messages
  const errorMap: Record<string, string> = {
    'PGRST116': 'No data found',
    'PGRST301': 'Permission denied',
    '23505': 'Duplicate entry',
    '23503': 'Referenced record not found',
    '42501': 'Insufficient permissions',
  };
  
  const userMessage = errorMap[error.code] || error.message || 'An unexpected error occurred';
  
  throw new SpartiCMSError(
    userMessage,
    error.code || 'UNKNOWN_ERROR',
    { originalError: error, operation }
  );
};

/**
 * Connection Health Check
 */

export const checkConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('cms_schemas').select('count').limit(1);
    return !error;
  } catch (error) {
    console.error('Connection check failed:', error);
    return false;
  }
};

/**
 * Development Utilities
 */

// Enable query logging in development
if (import.meta.env.DEV) {
  // Log all queries in development mode
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Sparti CMS Auth Event:', event, session?.user?.email);
  });
}

// Export the configured client as default
export default supabase;