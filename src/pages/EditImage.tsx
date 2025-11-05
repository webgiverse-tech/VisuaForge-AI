import React from 'react';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ScannerLoader from '@/components/ScannerLoader';
import { UploadCloud, Sparkles } from 'lucide-react';

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
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleModify = async () => {
    setLoading(true);
    setModifiedImage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setModifiedImage("https://public.dyad.sh/assets/placeholder.svg"); // Placeholder image
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center py-12">
      <h1 className="text-5xl font-bold text-vf-blue mb-10">Modifier une image par IA</h1>
      <div className="w-full max-w-3xl bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray animate-fade-in">
        <div className="mb-6">
          <Label htmlFor="image-upload" className="text-lg text-vf-blue mb-2 block">Uploader une image</Label>
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
                <UploadCloud className="w-12 h-12 text-vf-purple mb-3" />
                <p className="text-white text-lg">Glisse & dépose ou clique pour uploader</p>
                <p className="text-sm text-vf-gray">PNG, JPG, GIF jusqu'à 10MB</p>
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
          <Label htmlFor="instructions" className="text-lg text-vf-blue mb-2 block">Instructions de modification</Label>
          <Textarea
            id="instructions"
            placeholder="Ex: 'ajoute un fond spatial', 'rends-le plus réaliste', 'change la couleur en vert néon'"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="bg-vf-gray/30 border-vf-gray text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue h-32"
          />
        </div>
        <VisuaForgeButton
          onClick={handleModify}
          disabled={loading || !imageFile || !instructions.trim()}
          className="w-full text-lg py-3"
        >
          <Sparkles className="mr-2 h-5 w-5" /> Modifier l'image
        </VisuaForgeButton>

        {loading && (
          <div className="mt-10 flex flex-col items-center justify-center">
            <ScannerLoader />
            <p className="mt-4 text-vf-blue text-lg animate-pulse">Modification en cours...</p>
          </div>
        )}

        {modifiedImage && !loading && (
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold text-vf-purple mb-6">Résultat :</h2>
            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
              {imagePreview && (
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-vf-gray">
                  <h3 className="text-xl text-vf-gray mb-2">Avant</h3>
                  <img src={imagePreview} alt="Original Image" className="max-w-full h-auto rounded-lg" />
                </div>
              )}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-vf-blue">
                <h3 className="text-xl text-vf-blue mb-2">Après</h3>
                <img src={modifiedImage} alt="Modified AI Image" className="max-w-full h-auto rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <VisuaForgeButton variant="secondary" size="sm" onClick={() => alert('Téléchargement en cours!')}>
                    Télécharger
                  </VisuaForgeButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditImage;