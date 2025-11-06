import React from 'react';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { CheckCircle, Star, Zap, X } from 'lucide-react';
import { motion, Variants } from 'framer-motion'; // Import Variants

const Premium = () => {
  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      features: [
        { text: '10 générations par mois', available: true },
        { text: 'Accès aux styles de base', available: true },
        { text: 'Watermark sur les images', available: true },
        { text: 'Stockage limité', available: true },
        { text: 'Support communautaire', available: true },
        { text: 'Générations prioritaires', available: false },
        { text: 'Accès API', available: false },
        { text: 'Stockage privé illimité', available: false },
      ],
      cta: 'Commencer Gratuitement',
      variant: 'outline',
    },
    {
      name: 'Pro',
      price: '19€/mois',
      features: [
        { text: '200 générations par mois', available: true },
        { text: 'Tous les styles avancés', available: true },
        { text: 'Sans watermark', available: true },
        { text: 'Stockage étendu', available: true },
        { text: 'Support prioritaire', available: true },
        { text: 'Générations prioritaires', available: true },
        { text: 'Accès aux fonctionnalités bêta', available: true },
        { text: 'Accès API', available: false },
        { text: 'Stockage privé illimité', available: false },
      ],
      cta: 'Passer à Pro',
      variant: 'default',
      popular: true,
    },
    {
      name: 'Illimité',
      price: '49€/mois',
      features: [
        { text: 'Générations illimitées', available: true },
        { text: 'Tous les styles & modèles', available: true },
        { text: 'Sans watermark', available: true },
        { text: 'Stockage illimité', available: true },
        { text: 'Support 24/7', available: true },
        { text: 'Générations prioritaires', available: true },
        { text: 'Accès exclusif aux nouveautés', available: true },
        { text: 'API privée', available: true },
        { text: 'Stockage privé illimité', available: true },
      ],
      cta: 'Devenir Illimité',
      variant: 'secondary',
    },
  ];

  const containerVariants: Variants = { // Explicitly type containerVariants
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = { // Explicitly type cardVariants
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-vf-blue text-center mb-10"
        variants={cardVariants}
      >
        Débloque ton potentiel créatif
      </motion.h1>
      <motion.p
        className="text-base sm:text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={cardVariants}
      >
        Passe au niveau supérieur avec nos plans Premium et accède à des fonctionnalités exclusives pour des créations sans limites.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className="relative bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
          >
            {plan.popular && (
              <div className="absolute -top-4 right-4 bg-vf-purple text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-glow">
                Populaire
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-vf-blue mb-4">{plan.name}</h2>
            <p className="text-4xl sm:text-5xl font-extrabold text-vf-purple mb-6">{plan.price}</p>
            <ul className="text-sm sm:text-lg text-white space-y-3 mb-8 text-left w-full">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  {feature.available ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-vf-blue mr-3 flex-shrink-0" />
                  ) : (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-vf-gray mr-3 flex-shrink-0" />
                  )}
                  <span className={!feature.available ? "text-vf-gray line-through" : ""}>{feature.text}</span>
                </li>
              ))}
            </ul>
            <VisuaForgeButton variant={plan.variant as any} size="default" className="w-full text-base sm:text-lg py-3 sm:py-4 mt-auto">
              {plan.cta}
            </VisuaForgeButton>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Premium;