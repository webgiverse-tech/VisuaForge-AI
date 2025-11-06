import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { Sparkles, Maximize, Brush, Layers, Code, Brain } from 'lucide-react'; // Replaced HighResolution with Maximize

const featureCards = [
  {
    icon: Maximize, // Using Maximize icon
    title: "Génération Haute Résolution",
    description: "Crée des images d'une clarté et d'un détail exceptionnels, parfaites pour tous tes projets.",
    color: "text-vf-blue",
  },
  {
    icon: Brush,
    title: "Modifications Contextuelles",
    description: "Modifie intelligemment des éléments spécifiques de tes images avec des instructions textuelles précises.",
    color: "text-vf-purple",
  },
  {
    icon: Layers,
    title: "Filtres de Style Artistiques",
    description: "Applique une multitude de styles artistiques pour transformer radicalement l'ambiance de tes créations.",
    color: "text-vf-blue",
  },
  {
    icon: Code,
    title: "API Intégrable",
    description: "Intègre facilement nos puissantes capacités d'IA dans tes propres applications et workflows.",
    color: "text-vf-purple",
  },
  {
    icon: Brain,
    title: "Conseiller IA Intégré",
    description: "Obtiens des suggestions de prompts et des conseils créatifs pour maximiser le potentiel de tes idées.",
    color: "text-vf-blue",
  },
  {
    icon: Sparkles,
    title: "Création Illimitée",
    description: "Laisse libre cours à ton imagination sans aucune restriction sur le nombre de générations.",
    color: "text-vf-purple",
  },
];

const Features = () => {
  const containerVariants: Variants = { // Explicitly type containerVariants
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = { // Explicitly type itemVariants
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
      className="min-h-[calc(100vh-16rem)] py-12 px-4 sm:px-6 md:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-h1 font-bold text-vf-blue text-center mb-10"
        variants={itemVariants}
      >
        Découvre la Puissance de VisuaForge AI
      </motion.h1>
      <motion.p
        className="text-p text-vf-gray text-center mb-12 max-w-[95%] sm:max-w-[80%] md:max-w-[70%] mx-auto"
        variants={itemVariants}
      >
        Explore un ensemble de fonctionnalités avancées conçues pour transformer ta vision créative en réalité.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
      >
        {featureCards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${card.color.replace('text-', 'rgba(').replace('blue', '0, 191, 255').replace('purple', '138, 43, 226')}, 0.4)` }}
          >
            <card.icon className={`w-16 h-16 ${card.color} mb-4`} />
            <h3 className="text-h2 font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-p text-vf-gray">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Features;