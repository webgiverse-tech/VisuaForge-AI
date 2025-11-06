import React from 'react';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ScannerLoader from '@/components/ScannerLoader';
import { UploadCloud, Sparkles, Download, Share2, GalleryHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const WEBHOOK_URL = 'https://n8n-project-ivc9.onrender.com/webhook-test/image';

const EditImage = () => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [instructions, setInstructions] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [modifiedImage, setModifiedImage] = React.useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setModifiedImage(null); // Reset modified image on new upload
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setModifiedImage(null); // Reset modified image on new upload
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleModify = async () => {
    if (!imageFile || !instructions.trim()) {
      toast.error("Veuillez uploader une image et fournir des instructions.");
      return;
    }

    setLoading(true);
    setModifiedImage(null);
    toast.loading("Modification de l'image en cours...", { id: 'edit-toast' });

    try {
      const formData = new FormData();
      formData.append('mode', 'edit');
      formData.append('instruction', instructions);
      formData.append('image', imageFile); // Append the actual file

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData, // FormData handles Content-Type automatically
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the webhook returns an object with an 'imageUrl' field
      if (data && data.imageUrl) {
        setModifiedImage(data.imageUrl);
        toast.success("Image modifiée avec succès !", { id: 'edit-toast' });
      } else {
        throw new Error("Réponse du webhook invalide: imageUrl manquant.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'image:", error);
      toast.error(`Échec de la modification de l'image: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, { id: 'edit-toast' });
      setModifiedImage("https://public.dyad.sh/assets/placeholder.svg"); // Fallback to placeholder on error
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageSrc: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `visuaforge-ai-modified-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image téléchargée !");
  };

  const handleShare = (imageSrc: string) => {
    navigator.clipboard.writeText(imageSrc);
    toast.info("Lien de l'image copié dans le presse-papiers !");
  };

  const handleAddToGallery = (imageSrc: string, title: string) => {
    const gallery = JSON.parse(localStorage.getItem('visuaforge-gallery') || '[]');
    gallery.push({ id: Date.now().toString(), src: imageSrc, title: title, date: new Date().toISOString() });
    localStorage.setItem('visuaforge-gallery', JSON.stringify(gallery));
    toast.success("Image ajoutée à ta galerie !");
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-vf-blue mb-10">Modifier une image par IA</h1>
      <motion.div
        className="w-full max-w-3xl bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray animate-fade-in"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <Label htmlFor="image-upload" className="text-base sm:text-lg text-vf-blue mb-2 block">Uploader une image</Label>
          <div
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-vf-purple rounded-lg cursor-pointer bg-vf-gray/20 hover:bg-vf-gray/30 transition-colors duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('image-input')?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Image Preview" className="max-h-full max-w-full object-contain rounded-lg" />
            ) : (
              <>
                <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 text-vf-purple mb-3" />
                <p className="text-base sm:text-lg text-white">Glisse & dépose ou clique pour uploader</p>
                <p className="text-xs sm:text-sm text-vf-gray">PNG, JPG, GIF jusqu'à 10MB</p>
              </>
            )}
            <input
              id="image-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="mb-6">
          <Label htmlFor="instructions" className="text-base sm:text-lg text-vf-blue mb-2 block">Instructions de modification</Label>
          <Textarea
            id="instructions"
            placeholder="Ex: 'ajoute un fond spatial', 'rends-le plus réaliste', 'change la couleur en vert néon'"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="bg-vf-gray/30 border-vf-gray text-sm sm:text-base text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue h-32"
          />
        </div>
        <VisuaForgeButton
          onClick={handleModify}
          disabled={loading || !imageFile || !instructions.trim()}
          size="default"
          className="w-full text-base sm:text-lg py-3 sm:py-4"
        >
          <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Modifier l'image
        </VisuaForgeButton>

        {loading && (
          <motion.div
            className="mt-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScannerLoader />
            <p className="mt-4 text-vf-blue text-base sm:text-lg animate-pulse">Modification en cours...</p>
          </motion.div>
        )}

        {modifiedImage && !loading && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-vf-purple mb-6">Résultat :</h2>
            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
              {imagePreview && (
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-vf-gray p-4">
                  <h3 className="text-base sm:text-xl text-vf-gray mb-2">Avant</h3>
                  <img src={imagePreview} alt="Original Image" className="max-w-full h-auto rounded-lg" />
                </div>
              )}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-vf-blue p-4">
                <h3 className="text-base sm:text-xl text-vf-blue mb-2">Après</h3>
                <img src={modifiedImage} alt="Modified AI Image" className="max-w-full h-auto rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 space-x-2">
                  <VisuaForgeButton variant="secondary" size="sm" className="text-xs sm:text-sm" onClick={() => handleDownload(modifiedImage)}>
                    <Download className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Télécharger
                  </VisuaForgeButton>
                  <VisuaForgeButton variant="outline" size="sm" className="text-xs sm:text-sm" onClick={() => handleShare(modifiedImage)}>
                    <Share2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Partager
                  </VisuaForgeButton>
                  <VisuaForgeButton variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={() => handleAddToGallery(modifiedImage, instructions)}>
                    <GalleryHorizontal className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Ajouter à la galerie
                  </VisuaForgeButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EditImage;