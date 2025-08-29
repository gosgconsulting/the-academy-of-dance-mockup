import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from './SupabaseAuthProvider';

interface Tenant {
  id: string;
  tenant_id: string;
  name: string;
  domain: string | null;
  created_at: string;
}

interface TenantContextType {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  loading: boolean;
  setCurrentTenant: (tenant: Tenant) => Promise<void>;
  createTenant: (name: string, domain?: string) => Promise<{ error?: string }>;
  refreshTenants: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [currentTenant, setCurrentTenantState] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, session } = useSupabaseAuth();

  // Set the tenant context for RLS
  const setTenantRLSContext = async (tenantId: string) => {
    try {
      await supabase.rpc('set_config', {
        parameter: 'app.current_tenant',
        value: tenantId
      });
    } catch (error) {
      console.error('Error setting tenant RLS context:', error);
    }
  };

  // Load tenants when user is authenticated
  useEffect(() => {
    if (user && session) {
      refreshTenants();
    } else {
      setCurrentTenantState(null);
      setTenants([]);
      setLoading(false);
    }
  }, [user, session]);

  const refreshTenants = async () => {
    if (!session) return;
    
    try {
      setLoading(true);
      
      // Get all tenants (for now, we'll show all - in production you might want to filter by user access)
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setTenants(data || []);

      // Auto-select first tenant or create a default one
      if (data && data.length > 0) {
        const firstTenant = data[0];
        setCurrentTenantState(firstTenant);
        await setTenantRLSContext(firstTenant.tenant_id);
      } else {
        // Create a default tenant for the user
        await createDefaultTenant();
      }
    } catch (error) {
      console.error('Error loading tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultTenant = async () => {
    if (!user) return;

    try {
      const defaultTenantId = `tenant_${user.id.substring(0, 8)}`;
      const { data, error } = await supabase
        .from('tenants')
        .insert({
          tenant_id: defaultTenantId,
          name: `${user.email?.split('@')[0] || 'User'}'s Site`,
          domain: null
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTenants([data]);
        setCurrentTenantState(data);
        await setTenantRLSContext(data.tenant_id);
      }
    } catch (error) {
      console.error('Error creating default tenant:', error);
    }
  };

  const setCurrentTenant = async (tenant: Tenant) => {
    try {
      setCurrentTenantState(tenant);
      await setTenantRLSContext(tenant.tenant_id);
      localStorage.setItem('current_tenant_id', tenant.tenant_id);
    } catch (error) {
      console.error('Error setting current tenant:', error);
      throw error;
    }
  };

  const createTenant = async (name: string, domain?: string) => {
    if (!user) {
      return { error: 'User not authenticated' };
    }

    try {
      const tenantId = `tenant_${Math.random().toString(36).substring(2, 10)}`;
      const { data, error } = await supabase
        .from('tenants')
        .insert({
          tenant_id: tenantId,
          name,
          domain: domain || null
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTenants(prev => [...prev, data]);
        await setCurrentTenant(data);
      }

      return {};
    } catch (error: any) {
      return { error: error.message || 'Failed to create tenant' };
    }
  };

  const value = {
    currentTenant,
    tenants,
    loading,
    setCurrentTenant,
    createTenant,
    refreshTenants,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};