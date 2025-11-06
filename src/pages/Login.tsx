"use client";

import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
// import { toast } from 'sonner'; // No longer needed if onError is removed

const Login = () => {
  // The onError prop is not supported by @supabase/auth-ui-react's Auth component.
  // Error handling for auth events is typically managed via onAuthStateChange in SessionContextProvider.
  // const handleAuthError = (error: Error) => {
  //   toast.error(error.message || "Une erreur est survenue lors de la connexion.");
  // };

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray">
        <h1 className="text-3xl sm:text-4xl font-bold text-vf-blue text-center mb-8">Connexion</h1>
        <Auth
          supabaseClient={supabase}
          providers={[]} // No third-party providers for now
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--vf-blue))',
                  brandAccent: 'hsl(var(--vf-purple))',
                  inputBackground: 'hsl(var(--vf-gray) / 0.3)',
                  inputBorder: 'hsl(var(--vf-gray))',
                  inputBorderHover: 'hsl(var(--vf-blue))',
                  inputBorderFocus: 'hsl(var(--vf-blue))',
                  inputText: 'hsl(var(--white))',
                },
              },
            },
          }}
          theme="dark" // Use dark theme to match app style
          redirectTo={window.location.origin + '/admin/dashboard'}
          // onError={handleAuthError} // Removed as this prop does not exist
        />
        <p className="mt-6 text-center text-sm sm:text-base text-vf-gray">
          Pas encore de compte ? <a href="/register" className="text-vf-blue hover:underline">Inscris-toi ici</a>.
        </p>
      </div>
    </motion.div>
  );
};

export default Login;