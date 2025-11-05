import React from 'react';
import { Image } from 'lucide-react';

const mockGalleryImages = [
  { id: '1', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Dragon Cyberpunk" },
  { id: '2', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Forêt Enchantée" },
  { id: '3', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Cité Spatiale" },
  { id: '4', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Portrait Réaliste" },
  { id: '5', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Paysage Abstrait" },
  { id: '6', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Robot Ancien" },
  { id: '7', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Créature Fantastique" },
  { id: '8', src: "https://public.dyad.sh/assets/placeholder.svg", title: "Véhicule Volant" },
];

const Gallery = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] py-12">
      <h1 className="text-5xl font-bold text-vf-blue text-center mb-10">Ta Galerie de Créations</h1>
      <p className="text-xl text-vf-gray text-center mb-12">
        Retrouve toutes tes images générées et modifiées ici.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockGalleryImages.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-xl border border-vf-gray hover:border-vf-purple transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-lg text-white font-medium">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {mockGalleryImages.length === 0 && (
        <div className="text-center text-vf-gray mt-20">
          <Image className="w-24 h-24 mx-auto mb-4 text-vf-purple" />
          <p className="text-2xl">Aucune création pour le moment.</p>
          <p className="text-lg">Commence à générer ou modifier des images pour les voir apparaître ici !</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;