import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: "Qu'est-ce que VisuaForge AI ?",
    answer: "VisuaForge AI est une application SaaS qui te permet de générer et de modifier des images à l'aide de l'intelligence artificielle. Tu peux transformer des descriptions textuelles en images ou améliorer tes photos existantes.",
  },
  {
    question: "Comment fonctionne la génération d'images ?",
    answer: "Tu saisis un 'prompt' (une description textuelle de l'image que tu souhaites), tu choisis un style, et notre IA génère une image unique basée sur tes instructions. C'est comme avoir un artiste personnel à portée de main !",
  },
  {
    question: "Puis-je modifier mes propres images ?",
    answer: "Oui, absolument ! Tu peux uploader une image et donner des instructions textuelles à l'IA pour la modifier, par exemple : 'ajoute un fond spatial' ou 'rends ce portrait plus réaliste'.",
  },
  {
    question: "Quels sont les styles d'images disponibles ?",
    answer: "Nous proposons une variété de styles, y compris réaliste, cartoon, 3D rendu, digital art, futuriste, et abstrait. Nous ajoutons régulièrement de nouveaux styles !",
  },
  {
    question: "Mes créations sont-elles privées ?",
    answer: "Par défaut, tes créations sont stockées dans ta galerie personnelle. Tu as le contrôle total sur le partage et la suppression de tes images. Pour une confidentialité accrue, nos plans Premium offrent des options de stockage privé.",
  },
  {
    question: "Comment puis-je obtenir de meilleurs résultats avec mes prompts ?",
    answer: "Sois aussi descriptif que possible ! Inclue des détails sur les sujets, les couleurs, l'éclairage, l'ambiance, et le style artistique. Par exemple, au lieu de 'un chat', essaie 'un chat siamois majestueux avec des yeux bleus perçants, assis sur un trône en or, style peinture à l'huile, lumière dramatique'.",
  },
  {
    question: "Y a-t-il un plan gratuit ?",
    answer: "Oui, nous offrons un plan gratuit qui te permet de faire un certain nombre de générations par mois avec un watermark. C'est un excellent moyen de découvrir la puissance de VisuaForge AI !",
  },
];

const FAQ = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
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
        Questions Fréquemment Posées
      </motion.h1>
      <motion.p
        className="text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Trouve rapidement les réponses à tes interrogations sur VisuaForge AI.
      </motion.p>

      <motion.div
        className="max-w-3xl mx-auto bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray"
        variants={containerVariants}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem value={`item-${index}`} className="border-b border-vf-gray">
                <AccordionTrigger className="text-lg font-semibold text-white hover:text-vf-blue transition-colors">
                  <HelpCircle className="mr-3 h-5 w-5 text-vf-purple" /> {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-vf-gray text-base pl-8">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;