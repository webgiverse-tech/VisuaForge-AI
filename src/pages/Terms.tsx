import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] py-12 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-5xl font-bold text-vf-blue text-center mb-10">Conditions d'utilisation</h1>
      <div className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray text-white space-y-6">
        <p>
          Bienvenue sur VisuaForge AI. En accédant ou en utilisant notre service, vous acceptez d'être lié par les présentes conditions d'utilisation. Veuillez les lire attentivement.
        </p>
        <h2 className="text-3xl font-bold text-vf-purple mt-8 mb-4">1. Acceptation des Conditions</h2>
        <p>
          En utilisant VisuaForge AI, vous confirmez que vous avez lu, compris et accepté ces conditions. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser notre service.
        </p>
        <h2 className="text-3xl font-bold text-vf-purple mt-8 mb-4">2. Utilisation du Service</h2>
        <p>
          Vous acceptez d'utiliser le service uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits d'autrui ou ne restreint pas leur utilisation et leur jouissance du service.
        </p>
        <h2 className="text-3xl font-bold text-vf-purple mt-8 mb-4">3. Contenu Généré par l'Utilisateur</h2>
        <p>
          Vous êtes responsable de tout contenu que vous soumettez ou générez via notre service. Vous garantissez que vous avez les droits nécessaires pour utiliser ce contenu et que celui-ci ne viole aucune loi ou droit de tiers.
        </p>
        <h2 className="text-3xl font-bold text-vf-purple mt-8 mb-4">4. Modifications des Conditions</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur cette page. Il est de votre responsabilité de consulter régulièrement ces conditions.
        </p>
        <p className="text-sm text-vf-gray mt-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>
    </motion.div>
  );
};

export default Terms;