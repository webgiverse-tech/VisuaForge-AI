"use client";

import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-[95%] sm:max-w-md bg-vf-dark/60 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-vf-gray">
        <h1 className="text-h1 font-bold text-vf-blue text-center mb-8">Connexion Admin</h1>
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
        />
        <p className="mt-6 text-center text-p text-vf-gray">
          Pas encore de compte ? <a href="/register" className="text-vf-blue hover:underline">Inscris-toi ici</a>.
        </p>
      </div>
    </motion.div>
  );
};

export default Login;