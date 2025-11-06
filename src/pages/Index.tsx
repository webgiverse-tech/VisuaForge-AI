import { MadeWithDyad } from "@/components/made-with-dyad";
import { VisuaForgeButton } from "@/components/VisuaForgeButton";
import { Link } from "react-router-dom";
import { Sparkles, Image, PencilRuler, Lightbulb, Palette, Combine, MessageSquare, Quote, Zap, Download, BookOpen } from "lucide-react";
import { motion, Variants } from "framer-motion"; // Import Variants

const mockGalleryImages = [
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
];

const featureCards = [
  {
    icon: Lightbulb,
    title: "Générer des images uniques",
    description: "Transforme tes idées en visuels époustouflants avec notre IA.",
  },
  {
    icon: Palette,
    title: "Modifier ou restaurer des photos",
    description: "Améliore, stylise ou corrige tes images existantes en un instant.",
  },
  {
    icon: Combine,
    title: "Styliser ou combiner des visuels",
    description: "Expérimente avec des styles artistiques et fusionne des éléments.",
  },
];

const howItWorksSteps = [
  {
    icon: Lightbulb,
    title: "Décris ta vision",
    description: "Entrez un prompt textuel détaillé pour l'image que tu as en tête.",
  },
  {
    icon: Palette,
    title: "Choisis ton style",
    description: "Sélectionne parmi une variété de styles artistiques pour donner vie à ta vision.",
  },
  {
    icon: Sparkles,
    title: "Génère instantanément",
    description: "Notre IA transforme tes mots en une image unique en quelques secondes.",
  },
  {
    icon: Download,
    title: "Télécharge et partage",
    description: "Exportez tes créations en haute résolution ou partage-les facilement.",
  },
];

const testimonials = [
  {
    quote: "VisuaForge AI a révolutionné ma façon de créer du contenu. Les résultats sont incroyables et le processus est tellement intuitif !",
    author: "Sophie L.",
  },
  {
    quote: "J'ai pu donner vie à des idées que je pensais impossibles. L'outil de modification est un game-changer.",
    author: "Marc D.",
  },
  {
    quote: "La qualité des images générées est époustouflante. C'est un outil indispensable pour tout créateur.",
    author: "Émilie R.",
  },
];

const Index = () => {
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
      className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="relative z-10 mb-20 px-4 sm:px-6 md:px-8">
        <motion.h1
          className="text-h1 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-vf-blue to-vf-purple mb-6 leading-tight animate-pulse-light"
          variants={itemVariants}
        >
          Transforme ton imagination en image. En un clic. 🚀
        </motion.h1>
        <motion.p
          className="text-p text-vf-gray mb-10 max-w-[95%] sm:max-w-[80%] md:max-w-[70%] mx-auto"
          variants={itemVariants}
        >
          Laisse ton imagination peindre le futur. Crée, modifie, réinvente — sans limite.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          variants={itemVariants}
        >
          <Link to="/generate">
            <VisuaForgeButton size="lg" className="text-button-text px-8 py-4 w-full sm:w-auto">
              <Image className="mr-2 h-5 w-5" /> Créer une image maintenant
            </VisuaForgeButton>
          </Link>
          <Link to="/premium">
            <VisuaForgeButton variant="outline" size="lg" className="text-button-text px-8 py-4 w-full sm:w-auto">
              <Sparkles className="mr-2 h-5 w-5" /> Essayer gratuitement
            </VisuaForgeButton>
          </Link>
        </motion.div>
      </section>

      {/* What You Can Do Section */}
      <section className="w-full max-w-6xl relative z-10 mb-20 px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-h2 font-bold text-vf-blue mb-12"
          variants={itemVariants}
        >
          Ce que tu peux faire avec VisuaForge
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-vf-dark/60 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center hover:border-vf-purple transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(138, 43, 226, 0.4)" }}
            >
              <card.icon className="w-12 h-12 text-vf-purple mb-4" />
              <h3 className="text-h2 font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-p text-vf-gray">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* New Section: How It Works (Simplified) */}
      <section className="w-full max-w-6xl relative z-10 mb-20 px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-h2 font-bold text-vf-blue mb-12"
          variants={itemVariants}
        >
          Comment ça marche ?
        </motion.h2>
        <motion.p
          className="text-p text-vf-gray mb-10 max-w-[95%] sm:max-w-[80%] md:max-w-[70%] mx-auto"
          variants={itemVariants}
        >
          Créez des images époustouflantes en quelques étapes simples.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-vf-dark/60 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center hover:border-vf-blue transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 191, 255, 0.4)" }}
            >
              <step.icon className="w-12 h-12 text-vf-blue mb-4" />
              <h3 className="text-h2 font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-p text-vf-gray text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={itemVariants} className="mt-12">
          <Link to="/how-it-works">
            <VisuaForgeButton variant="outline" size="lg" className="text-button-text px-8 py-4">
              <BookOpen className="mr-2 h-5 w-5" /> Voir le guide complet
            </VisuaForgeButton>
          </Link>
        </motion.div>
      </section>

      {/* Mock Gallery Section */}
      <section className="w-full max-w-6xl relative z-10 mb-20 px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-h2 font-bold text-vf-blue mb-10"
          variants={itemVariants}
        >
          Découvre les dernières créations
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {mockGalleryImages.map((src, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-xl border border-vf-gray hover:border-vf-blue transition-all duration-300 transform hover:scale-105"
              variants={itemVariants}
              whileHover={{ rotateY: 5, rotateX: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={src}
                alt={`Generated Image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-p text-white font-medium">Image {index + 1}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* New Section: Testimonials */}
      <section className="w-full max-w-6xl relative z-10 mb-20 px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-h2 font-bold text-vf-blue mb-12"
          variants={itemVariants}
        >
          Ce que nos utilisateurs disent
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center hover:border-vf-purple transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(138, 43, 226, 0.4)" }}
            >
              <Quote className="w-12 h-12 text-vf-purple mb-4" />
              <p className="text-p text-white italic mb-4">"{testimonial.quote}"</p>
              <p className="text-p text-vf-gray font-semibold">- {testimonial.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <motion.section
        className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[70%] mx-auto relative z-10 bg-gradient-to-r from-vf-blue/20 to-vf-purple/20 p-10 rounded-2xl shadow-3xl border border-vf-blue animate-glow-light"
        variants={itemVariants}
      >
        <h2 className="text-h2 font-bold text-white mb-4">Prêt à créer ?</h2>
        <p className="text-p text-vf-gray mb-8">
          Rejoins des milliers de créateurs et donne vie à tes visions.
        </p>
        <Link to="/generate">
          <VisuaForgeButton size="lg" className="text-button-text px-10 py-5 animate-pulse-light">
            Commencer l'aventure IA
          </VisuaForgeButton>
        </Link>
      </motion.section>

      <MadeWithDyad />
    </motion.div>
  );
};

export default Index;