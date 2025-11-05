import React from 'react';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ScannerLoader from '@/components/ScannerLoader';
import { Sparkles } from 'lucide-react';

const GenerateImage = () => {
  const [prompt, setPrompt] = React.useState('');
  const [style, setStyle] = React.useState('futuristic');
  const [loading, setLoading] = React.useState(false);
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedImage(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratedImage("https://public.dyad.sh/assets/placeholder.svg"); // Placeholder image
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center py-12">
      <h1 className="text-5xl font-bold text-vf-blue mb-10">Générer une image par IA</h1>
      <div className="w-full max-w-3xl bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray animate-fade-in">
        <div className="mb-6">
          <Label htmlFor="prompt" className="text-lg text-vf-blue mb-2 block">Ton idée (prompt textuel)</Label>
          <Textarea
            id="prompt"
            placeholder="Décris l'image que tu veux générer, ex: 'Un dragon cyberpunk crachant du feu néon dans une ville futuriste'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-vf-gray/30 border-vf-gray text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue h-32"
          />
        </div>
        <div className="mb-8">
          <Label htmlFor="style" className="text-lg text-vf-blue mb-2 block">Style d'image</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="w-full bg-vf-gray/30 border-vf-gray text-white focus:border-vf-blue focus:ring-vf-blue">
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
          className="w-full text-lg py-3"
        >
          <Sparkles className="mr-2 h-5 w-5" /> Générer avec IA
        </VisuaForgeButton>

        {loading && (
          <div className="mt-10 flex flex-col items-center justify-center">
            <ScannerLoader />
            <p className="mt-4 text-vf-blue text-lg animate-pulse">Génération en cours...</p>
          </div>
        )}

        {generatedImage && !loading && (
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-bold text-vf-purple mb-6">Ton image générée :</h2>
            <div className="relative inline-block rounded-lg overflow-hidden shadow-2xl border border-vf-blue">
              <img src={generatedImage} alt="Generated AI Image" className="max-w-full h-auto rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <VisuaForgeButton variant="secondary" size="sm" onClick={() => alert('Téléchargement en cours!')}>
                  Télécharger
                </VisuaForgeButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;