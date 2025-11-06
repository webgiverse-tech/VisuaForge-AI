"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { LogOut, Users, BarChart, CreditCard, FileText, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const { session, supabase } = useSupabase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!session) {
    // This case should ideally be handled by SessionContextProvider redirecting to /login
    // but as a fallback, we can show a message or redirect here.
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center text-vf-gray text-xl sm:text-2xl">
        Accès refusé. Veuillez vous connecter.
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-vf-blue text-center mb-10">Tableau de Bord Admin</h1>
      <p className="text-base sm:text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto">
        Bienvenue, {session.user?.email} ! Gérez votre application VisuaForge AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* User Management Card */}
        <motion.div
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-vf-purple mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Gestion des Utilisateurs</h2>
          <p className="text-sm sm:text-base text-vf-gray mb-4">Visualisez et gérez les comptes utilisateurs.</p>
          <VisuaForgeButton variant="outline" size="sm" className="mt-auto text-sm sm:text-base">Voir les utilisateurs</VisuaForgeButton>
        </motion.div>

        {/* Statistics Card */}
        <motion.div
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <BarChart className="w-12 h-12 sm:w-16 sm:h-16 text-vf-blue mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Statistiques</h2>
          <p className="text-sm sm:text-base text-vf-gray mb-4">Suivez les performances et l'utilisation de l'IA.</p>
          <VisuaForgeButton variant="outline" size="sm" className="mt-auto text-sm sm:text-base">Voir les statistiques</VisuaForgeButton>
        </motion.div>

        {/* Payments Card */}
        <motion.div
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-vf-purple mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Paiements Moneroo.io</h2>
          <p className="text-sm sm:text-base text-vf-gray mb-4">Gérez et suivez les transactions crypto.</p>
          <VisuaForgeButton variant="outline" size="sm" className="mt-auto text-sm sm:text-base">Voir les paiements</VisuaForgeButton>
        </motion.div>

        {/* Generation Logs Card */}
        <motion.div
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-vf-blue mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Logs de Génération</h2>
          <p className="text-sm sm:text-base text-vf-gray mb-4">Consultez l'historique des créations d'images.</p>
          <VisuaForgeButton variant="outline" size="sm" className="mt-auto text-sm sm:text-base">Voir les logs</VisuaForgeButton>
        </motion.div>

        {/* Plan Management Card */}
        <motion.div
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <Settings className="w-12 h-12 sm:w-16 sm:h-16 text-vf-purple mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Gestion des Plans</h2>
          <p className="text-sm sm:text-base text-vf-gray mb-4">Configurez les plans d'abonnement.</p>
          <VisuaForgeButton variant="outline" size="sm" className="mt-auto text-sm sm:text-base">Gérer les plans</VisuaForgeButton>
        </motion.div>

        {/* Logout Card */}
        <motion.div
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center"
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255, 0, 0, 0.3)" }}
        >
          <LogOut className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Déconnexion</h2>
          <p className="text-sm sm:text-base text-vf-gray mb-4">Déconnectez-vous de la session administrateur.</p>
          <VisuaForgeButton variant="destructive" onClick={handleLogout} size="sm" className="mt-auto text-sm sm:text-base">Déconnexion</VisuaForgeButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;