import React from 'react';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ScannerLoader from '@/components/ScannerLoader';
import { Sparkles, Download, Share2, GalleryHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const WEBHOOK_URL = 'https://n8n-project-ivc9.onrender.com/webhook-test/image';

const GenerateImage = () => {
  const [prompt, setPrompt] = React.useState('');
  const [style, setStyle] = React.useState('futuristic');
  const [loading, setLoading] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Veuillez entrer une idée pour générer l'image.");
      return;
    }

    setLoading(true);
    setGeneratedImage(null);
    toast.loading("Génération de l'image en cours...", { id: 'generate-toast' });

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'generate',
          idea: prompt,
          style: style, // Sending style to the webhook
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the webhook returns an object with an 'imageUrl' field
      if (data && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success("Image générée avec succès !", { id: 'generate-toast' });
      } else {
        throw new Error("Réponse du webhook invalide: imageUrl manquant.");
      }
    } catch (error) {
      console.error("Erreur lors de la génération de l'image:", error);
      toast.error(`Échec de la génération de l'image: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, { id: 'generate-toast' });
      setGeneratedImage("https://public.dyad.sh/assets/placeholder.svg"); // Fallback to placeholder on error
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `visuaforge-ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image téléchargée !");
    }
  };

  const handleShare = () => {
    if (generatedImage) {
      // In a real app, this would open a share dialog or copy link
      navigator.clipboard.writeText(generatedImage);
      toast.info("Lien de l'image copié dans le presse-papiers !");
    }
  };

  const handleAddToGallery = () => {
    if (generatedImage) {
      // Simulate adding to gallery (e.g., localStorage)
      const gallery = JSON.parse(localStorage.getItem('visuaforge-gallery') || '[]');
      gallery.push({ id: Date.now().toString(), src: generatedImage, title: prompt, date: new Date().toISOString() });
      localStorage.setItem('visuaforge-gallery', JSON.stringify(gallery));
      toast.success("Image ajoutée à ta galerie !");
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-vf-blue mb-10">Générer une image par IA</h1>
      <motion.div
        className="w-full max-w-3xl bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray animate-fade-in"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <Label htmlFor="prompt" className="text-base sm:text-lg text-vf-blue mb-2 block">Ton idée (prompt textuel)</Label>
          <Textarea
            id="prompt"
            placeholder="Décris l'image que tu veux générer, ex: 'Un dragon cyberpunk crachant du feu néon dans une ville futuriste'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-vf-gray/30 border-vf-gray text-sm sm:text-base text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue h-32"
          />
        </div>
        <div className="mb-8">
          <Label htmlFor="style" className="text-base sm:text-lg text-vf-blue mb-2 block">Style d'image</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="w-full bg-vf-gray/30 border-vf-gray text-sm sm:text-base text-white focus:border-vf-blue focus:ring-vf-blue">
              <SelectValue placeholder="Sélectionne un style" />
            </SelectTrigger>
            <SelectContent className="bg-vf-dark border-vf-gray text-white">
              <SelectItem value="realistic">Réaliste</SelectItem>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="3d">3D Rendu</SelectItem>
              <SelectItem value="digital-art">Digital Art</SelectItem>
              <SelectItem value="futuristic">Futuriste</SelectItem>
              <SelectItem value="abstract">Abstrait</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <VisuaForgeButton
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          size="default"
          className="w-full text-base sm:text-lg py-3 sm:py-4"
        >
          <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Générer avec IA
        </VisuaForgeButton>

        {loading && (
          <motion.div
            className="mt-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScannerLoader />
            <p className="mt-4 text-vf-blue text-base sm:text-lg animate-pulse">Génération en cours...</p>
          </motion.div>
        )}

        {generatedImage && !loading && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-vf-purple mb-6">Ton image générée :</h2>
            <div className="relative inline-block rounded-lg overflow-hidden shadow-2xl border border-vf-blue">
              <img src={generatedImage} alt="Generated AI Image" className="max-w-full h-auto rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 space-x-2">
                <VisuaForgeButton variant="secondary" size="sm" className="text-xs sm:text-sm">
                  <Download className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Télécharger
                </VisuaForgeButton>
                <VisuaForgeButton variant="outline" size="sm" className="text-xs sm:text-sm">
                  <Share2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Partager
                </VisuaForgeButton>
                <VisuaForgeButton variant="ghost" size="sm" className="text-xs sm:text-sm">
                  <GalleryHorizontal className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Ajouter à la galerie
                </VisuaForgeButton>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GenerateImage;