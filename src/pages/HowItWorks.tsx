import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { Lightbulb, Palette, Sparkles, Download, PlayCircle } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: "Étape 1 : Entrez votre idée",
    description: "Décris l'image que tu as en tête avec un prompt textuel détaillé. Plus c'est précis, mieux c'est !",
  },
  {
    icon: Palette,
    title: "Étape 2 : Choisissez un style",
    description: "Sélectionne parmi une variété de styles artistiques (réaliste, cartoon, futuriste...) pour donner vie à ta vision.",
  },
  {
    icon: Sparkles,
    title: "Étape 3 : Laissez l'IA créer",
    description: "Notre intelligence artificielle analyse tes instructions et génère une image unique en quelques secondes.",
  },
  {
    icon: Download,
    title: "Étape 4 : Téléchargez ou partagez",
    description: "Une fois l'image parfaite obtenue, télécharge-la en haute résolution ou partage-la avec le monde entier.",
  },
];

const HowItWorks = () => {
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
        className="text-5xl font-bold text-vf-blue text-center mb-10"
        variants={itemVariants}
      >
        Comment Utiliser VisuaForge AI
      </motion.h1>
      <motion.p
        className="text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Créer des images époustouflantes n'a jamais été aussi simple. Suis ces étapes pour commencer ton aventure créative.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(138, 43, 226, 0.4)" }}
          >
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-vf-purple/20 border-2 border-vf-purple mb-6">
              <span className="absolute text-4xl font-bold text-vf-purple -top-4 -left-4 opacity-30">{index + 1}</span>
              <step.icon className="w-10 h-10 text-vf-blue" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-vf-gray">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <h2 className="text-4xl font-bold text-vf-blue mb-6">Conseils de Pro</h2>
        <div className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray">
          <p className="text-xl text-white mb-4">
            💡 Essayez des prompts détaillés pour de meilleurs résultats. Incluez des adjectifs, des couleurs, l'éclairage, l'ambiance et des styles spécifiques.
          </p>
          <p className="text-xl text-white">
            ✨ N'hésitez pas à expérimenter ! L'IA est là pour explorer ta créativité.
          </p>
        </div>
        <motion.div
          className="mt-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#" className="inline-flex items-center text-vf-purple hover:text-vf-blue transition-colors text-xl font-medium">
            <PlayCircle className="mr-3 h-7 w-7" /> Regarder le tutoriel vidéo
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;