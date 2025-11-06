"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Database } from '@/integrations/supabase/database.types'; // Import database types

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string;
}

interface SupabaseContextType {
  supabase: SupabaseClient<Database>;
  session: Session | null;
  profile: UserProfile | null;
  isAdmin: boolean;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, avatar_url, role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
        } else {
          setProfile(profileData);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN' && session) {
        // Fetch profile immediately after sign-in
        supabase
          .from('profiles')
          .select('id, first_name, last_name, avatar_url, role')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profileData, error }) => {
            if (error) {
              console.error("Error fetching profile on sign-in:", error);
              setProfile(null);
            } else {
              setProfile(profileData);
              if (profileData?.role === 'admin') {
                navigate('/admin/dashboard');
              } else {
                navigate('/dashboard');
              }
            }
          });
      } else if (_event === 'SIGNED_OUT') {
        setProfile(null);
        navigate('/login'); // Redirect to login on sign out
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const isAdmin = profile?.role === 'admin';

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-vf-blue text-2xl">Chargement de la session...</div>;
  }

  return (
    <SupabaseContext.Provider value={{ supabase, session, profile, isAdmin }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SessionContextProvider');
  }
  return context;
};