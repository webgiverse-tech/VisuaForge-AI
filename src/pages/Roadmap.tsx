import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { Rocket, Video, User, Filter, CheckCircle, Sparkles, Layers, Globe, MessageSquare } from 'lucide-react'; // Import missing icons

const roadmapItems = [
  {
    phase: "Phase 1 : Lancement & Optimisation (Actuel)",
    features: [
      { icon: CheckCircle, text: "Génération d'images par prompt", completed: true },
      { icon: CheckCircle, text: "Modification d'images existantes", completed: true },
      { icon: CheckCircle, text: "Galerie utilisateur", completed: true },
      { icon: CheckCircle, text: "Plans d'abonnement (Gratuit, Pro, Illimité)", completed: true },
      { icon: CheckCircle, text: "API publique pour développeurs", completed: true },
    ],
  },
  {
    phase: "Phase 2 : Expansion Créative (Prochainement)",
    features: [
      { icon: Video, text: "Génération vidéo par IA", completed: false },
      { icon: User, text: "Création d'avatars IA personnalisés", completed: false },
      { icon: Filter, text: "Filtres artistiques avancés", completed: false },
      { icon: Rocket, text: "Amélioration de la vitesse de génération", completed: false },
    ],
  },
  {
    phase: "Phase 3 : Innovation & Communauté (Futur)",
    features: [
      { icon: Sparkles, text: "Génération 3D à partir de texte", completed: false },
      { icon: Layers, text: "Outils de collaboration en temps réel", completed: false },
      { icon: Globe, text: "Marché de prompts et de styles", completed: false },
      { icon: MessageSquare, text: "Assistant IA intégré pour la créativité", completed: false },
    ],
  },
];

const Roadmap = () => {
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
      className="min-h-[calc(100vh-16rem)] py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-vf-blue text-center mb-10"
        variants={itemVariants}
      >
        Notre Feuille de Route
      </motion.h1>
      <motion.p
        className="text-base sm:text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Découvrez les fonctionnalités que nous développons pour l'avenir de VisuaForge AI.
      </motion.p>

      <div className="max-w-4xl mx-auto space-y-12">
        {roadmapItems.map((phase, index) => (
          <motion.div
            key={index}
            className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray"
            variants={itemVariants}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-vf-purple mb-6 flex items-center">
              <Rocket className="mr-3 h-6 w-6 sm:h-7 sm:w-7" /> {phase.phase}
            </h2>
            <ul className="space-y-4">
              {phase.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center text-base sm:text-lg text-white">
                  {feature.completed ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-vf-blue mr-3 flex-shrink-0" />
                  ) : (
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-vf-gray mr-3 flex-shrink-0" />
                  )}
                  <span className={!feature.completed ? "text-vf-gray" : ""}>{feature.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Roadmap;