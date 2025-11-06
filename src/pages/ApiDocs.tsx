import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { Code, Globe, FileText } from 'lucide-react';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { toast } from 'sonner';
import { Link } from 'react-router-dom'; // Import Link

const ApiDocs = () => {
  const webhookUrl = 'https://n8n-project-ivc9.onrender.com/webhook-test/image';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copié dans le presse-papiers !");
  };

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
        API Publique VisuaForge AI
      </motion.h1>
      <motion.p
        className="text-base sm:text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Intégrez la puissance de la génération et modification d'images par IA directement dans vos applications.
      </motion.p>

      <div className="max-w-4xl mx-auto space-y-12">
        <motion.section
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-vf-purple mb-4 flex items-center">
            <Globe className="mr-3 h-6 w-6 sm:h-7 sm:w-7" /> Endpoint du Webhook
          </h2>
          <p className="text-base sm:text-lg text-white mb-4">
            Toutes les requêtes API sont envoyées à notre webhook n8n.
          </p>
          <div className="bg-vf-gray/30 p-4 rounded-md text-vf-blue font-mono break-all flex justify-between items-center">
            <code className="text-xs sm:text-base">{webhookUrl}</code>
            <VisuaForgeButton variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={() => copyToClipboard(webhookUrl)}>
              Copier
            </VisuaForgeButton>
          </div>
        </motion.section>

        <motion.section
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-vf-purple mb-4 flex items-center">
            <Code className="mr-3 h-6 w-6 sm:h-7 sm:w-7" /> Génération d'Image (mode: "generate")
          </h2>
          <p className="text-base sm:text-lg text-white mb-4">
            Envoyez un prompt textuel pour générer une nouvelle image.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-vf-blue mb-2">Requête POST</h3>
          <pre className="bg-vf-gray/30 p-4 rounded-md text-white font-mono text-xs sm:text-sm overflow-x-auto">
            <code>
              {`curl -X POST ${webhookUrl} \\
  -H "Content-Type: application/json" \\
  -d '{
    "mode": "generate",
    "idea": "un robot sur la lune, style cyberpunk, néon",
    "style": "futuristic"
  }'`}
            </code>
            <VisuaForgeButton variant="ghost" size="sm" className="float-right text-xs sm:text-sm" onClick={() => copyToClipboard(`curl -X POST ${webhookUrl} -H "Content-Type: application/json" -d '{"mode": "generate", "idea": "un robot sur la lune, style cyberpunk, néon", "style": "futuristic"}'`)}>
              Copier
            </VisuaForgeButton>
          </pre>
          <h3 className="text-lg sm:text-xl font-semibold text-vf-blue mt-6 mb-2">Réponse (JSON)</h3>
          <pre className="bg-vf-gray/30 p-4 rounded-md text-white font-mono text-xs sm:text-sm overflow-x-auto">
            <code>
              {`{
  "status": "success",
  "imageUrl": "https://public.dyad.sh/assets/placeholder.svg",
  "message": "Image générée avec succès."
}`}
            </code>
            <VisuaForgeButton variant="ghost" size="sm" className="float-right text-xs sm:text-sm" onClick={() => copyToClipboard(`{"status": "success", "imageUrl": "https://public.dyad.sh/assets/placeholder.svg", "message": "Image générée avec succès."}`)}>
              Copier
            </VisuaForgeButton>
          </pre>
        </motion.section>

        <motion.section
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-vf-purple mb-4 flex items-center">
            <Code className="mr-3 h-6 w-6 sm:h-7 sm:w-7" /> Modification d'Image (mode: "edit")
          </h2>
          <p className="text-base sm:text-lg text-white mb-4">
            Envoyez une image et des instructions pour la modifier.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-vf-blue mb-2">Requête POST (multipart/form-data)</h3>
          <pre className="bg-vf-gray/30 p-4 rounded-md text-white font-mono text-xs sm:text-sm overflow-x-auto">
            <code>
              {`curl -X POST ${webhookUrl} \\
  -H "Content-Type: multipart/form-data" \\
  -F "mode=edit" \\
  -F "instruction=ajoute un fond spatial" \\
  -F "image=@/chemin/vers/ton/image.png"`}
            </code>
            <VisuaForgeButton variant="ghost" size="sm" className="float-right text-xs sm:text-sm" onClick={() => copyToClipboard(`curl -X POST ${webhookUrl} -H "Content-Type: multipart/form-data" -F "mode=edit" -F "instruction=ajoute un fond spatial" -F "image=@/chemin/vers/ton/image.png"`)}>
              Copier
            </VisuaForgeButton>
          </pre>
          <h3 className="text-lg sm:text-xl font-semibold text-vf-blue mt-6 mb-2">Réponse (JSON)</h3>
          <pre className="bg-vf-gray/30 p-4 rounded-md text-white font-mono text-xs sm:text-sm overflow-x-auto">
            <code>
              {`{
  "status": "success",
  "imageUrl": "https://public.dyad.sh/assets/placeholder.svg",
  "message": "Image modifiée avec succès."
}`}
            </code>
            <VisuaForgeButton variant="ghost" size="sm" className="float-right text-xs sm:text-sm" onClick={() => copyToClipboard(`{"status": "success", "imageUrl": "https://public.dyad.sh/assets/placeholder.svg", "message": "Image modifiée avec succès."}`)}>
              Copier
            </VisuaForgeButton>
          </pre>
        </motion.section>

        <motion.section
          className="bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-vf-blue mb-4">Besoin d'aide ?</h2>
          <p className="text-base sm:text-lg text-vf-gray mb-6">
            Consultez notre documentation complète ou contactez notre support pour toute question.
          </p>
          <VisuaForgeButton asChild size="default" className="text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4">
            <Link to="/contact">
              <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contacter le Support
            </Link>
          </VisuaForgeButton>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default ApiDocs;