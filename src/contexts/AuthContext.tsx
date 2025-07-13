
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface DemoProfile {
  id: string;
  full_name: string;
  role: 'manager' | 'worker';
  department: string | null;
  email: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | DemoProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isManager: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | DemoProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const createDemoProfile = (): DemoProfile => {
    const demoRole = localStorage.getItem('demo_role') as 'manager' | 'worker' || 'manager';
    const demoName = localStorage.getItem('demo_name') || 'Demo User';
    const demoDepartment = localStorage.getItem('demo_department') || null;
    
    return {
      id: 'demo-user',
      full_name: demoName,
      role: demoRole,
      department: demoDepartment,
      email: 'demo@smartzone.ai'
    };
  };

  useEffect(() => {
    // Check for demo access first
    const demoAccess = localStorage.getItem('demo_access') === 'true';
    
    if (demoAccess) {
      setProfile(createDemoProfile());
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      // Clear demo access
      localStorage.removeItem('demo_access');
      localStorage.removeItem('demo_role');
      localStorage.removeItem('demo_name');
      localStorage.removeItem('demo_department');
      
      // Sign out from Supabase if logged in
      if (user) {
        await supabase.auth.signOut();
      }
      
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isManager = profile?.role === 'manager';

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
    isManager,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
