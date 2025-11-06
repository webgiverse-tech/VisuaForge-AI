import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] py-12 max-w-[95%] sm:max-w-[80%] md:max-w-4xl mx-auto px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-h1 font-bold text-vf-blue text-center mb-10">Politique de confidentialité</h1>
      <div className="bg-vf-dark/60 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-vf-gray text-white space-y-6">
        <p className="text-p">
          Chez VisuaForge AI, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
        </p>
        <h2 className="text-h2 font-bold text-vf-purple mt-8 mb-4">1. Informations que nous collectons</h2>
        <p className="text-p">
          Nous collectons des informations que vous nous fournissez directement, telles que votre nom, votre adresse e-mail et vos préférences d'utilisation lorsque vous créez un compte ou utilisez nos services. Nous collectons également des données d'utilisation anonymes pour améliorer notre service.
        </p>
        <h2 className="text-h2 font-bold text-vf-purple mt-8 mb-4">2. Comment nous utilisons vos informations</h2>
        <p className="text-p">
          Nous utilisons vos informations pour fournir, maintenir et améliorer nos services, pour communiquer avec vous, et pour personnaliser votre expérience. Nous n'utilisons pas vos images générées à des fins de formation sans votre consentement explicite.
        </p>
        <h2 className="text-h2 font-bold text-vf-purple mt-8 mb-4">3. Partage des informations</h2>
        <p className="text-p">
          Nous ne partageons pas vos informations personnelles avec des tiers, sauf si cela est nécessaire pour fournir le service (par exemple, avec des fournisseurs de services tiers qui nous aident à fonctionner) ou si la loi l'exige.
        </p>
        <h2 className="text-h2 font-bold text-vf-purple mt-8 mb-4">4. Sécurité des données</h2>
        <p className="text-p">
          Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos informations contre l'accès non autorisé, la modification, la divulgation ou la destruction.
        </p>
        <p className="text-p text-sm text-vf-gray mt-8">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>
    </motion.div>
  );
};

export default Privacy;