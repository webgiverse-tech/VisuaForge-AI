import { MadeWithDyad } from "@/components/made-with-dyad";
import { VisuaForgeButton } from "@/components/VisuaForgeButton";
import { Link } from "react-router-dom";
import { Sparkles, Image, PencilRuler } from "lucide-react";

const mockGalleryImages = [
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
  "https://public.dyad.sh/assets/placeholder.svg",
];

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center py-16">
      {/* Hero Section */}
      <section className="relative z-10 mb-20">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-vf-blue to-vf-purple mb-6 leading-tight animate-pulse-light">
          Transforme ton imagination en image avec VisuaForge AI 🚀
        </h1>
        <p className="text-xl text-vf-gray mb-10 max-w-3xl mx-auto">
          Laisse ton imagination peindre le futur. Crée, modifie, réinvente — sans limite.
        </p>
        <div className="flex justify-center space-x-6">
          <Link to="/generate">
            <VisuaForgeButton size="lg" className="text-lg px-8 py-4">
              <Image className="mr-2 h-5 w-5" /> Créer une image
            </VisuaForgeButton>
          </Link>
          <Link to="/edit">
            <VisuaForgeButton variant="outline" size="lg" className="text-lg px-8 py-4">
              <PencilRuler className="mr-2 h-5 w-5" /> Modifier une image
            </VisuaForgeButton>
          </Link>
        </div>
      </section>

      {/* Mock Gallery Section */}
      <section className="w-full max-w-6xl relative z-10 mb-20">
        <h2 className="text-4xl font-bold text-vf-blue mb-10">Découvre les dernières créations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockGalleryImages.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-xl border border-vf-gray hover:border-vf-blue transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={src}
                alt={`Generated Image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm text-white font-medium">Image {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Index;