import React from 'react';
import { Image, Download, Share2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { toast } from 'sonner';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  date: string;
}

const Gallery = () => {
  const [galleryImages, setGalleryImages] = React.useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);

  React.useEffect(() => {
    const storedGallery = JSON.parse(localStorage.getItem('visuaforge-gallery') || '[]');
    setGalleryImages(storedGallery);
  }, []);

  const handleDelete = (id: string) => {
    const updatedGallery = galleryImages.filter(img => img.id !== id);
    setGalleryImages(updatedGallery);
    localStorage.setItem('visuaforge-gallery', JSON.stringify(updatedGallery));
    toast.success("Image supprimée de la galerie.");
    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  };

  const handleDownload = (imageSrc: string, title: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `visuaforge-ai-${title.replace(/\s/g, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image téléchargée !");
  };

  const handleShare = (imageSrc: string) => {
    navigator.clipboard.writeText(imageSrc);
    toast.info("Lien de l'image copié dans le presse-papiers !");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
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
        Ta Galerie de Créations
      </motion.h1>
      <motion.p
        className="text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Retrouve toutes tes images générées et modifiées ici.
      </motion.p>

      {galleryImages.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative group overflow-hidden rounded-lg shadow-xl border border-vf-gray hover:border-vf-purple transition-all duration-300 transform hover:scale-105 cursor-pointer"
              variants={itemVariants}
              whileHover={{ rotateY: 5, rotateX: 5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-lg text-white font-medium">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center text-vf-gray mt-20"
          variants={itemVariants}
        >
          <Image className="w-24 h-24 mx-auto mb-4 text-vf-purple" />
          <p className="text-2xl">Aucune création pour le moment.</p>
          <p className="text-lg">Commence à générer ou modifier des images pour les voir apparaître ici !</p>
        </motion.div>
      )}

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-vf-dark/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative bg-vf-dark/95 border border-vf-blue rounded-lg shadow-3xl p-6 max-w-4xl w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              className="absolute top-4 right-4 text-vf-gray hover:text-vf-blue transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold text-vf-blue mb-4">{selectedImage.title}</h2>
            <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-auto rounded-lg mb-4" />
            <div className="flex justify-center space-x-4">
              <VisuaForgeButton onClick={() => handleDownload(selectedImage.src, selectedImage.title)}>
                <Download className="mr-2 h-5 w-5" /> Télécharger
              </VisuaForgeButton>
              <VisuaForgeButton variant="outline" onClick={() => handleShare(selectedImage.src)}>
                <Share2 className="mr-2 h-5 w-5" /> Partager
              </VisuaForgeButton>
              <VisuaForgeButton variant="destructive" onClick={() => handleDelete(selectedImage.id)}>
                <Trash2 className="mr-2 h-5 w-5" /> Supprimer
              </VisuaForgeButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Gallery;