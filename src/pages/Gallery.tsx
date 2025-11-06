import React from 'react';
import { Image, Download, Share2, Trash2, X } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { toast } from 'sonner';
import { useSupabase } from '@/components/SessionContextProvider'; // Import useSupabase
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface GalleryImage {
  id: string;
  image_url: string;
  prompt: string | null;
  style: string | null;
  mode: string;
  created_at: string;
}

const Gallery = () => {
  const { session, supabase } = useSupabase();
  const [galleryImages, setGalleryImages] = React.useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (session) {
      fetchGalleryImages();
    } else {
      setGalleryImages([]);
      setLoading(false);
    }
  }, [session]);

  const fetchGalleryImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('user_id', session?.user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching gallery images:", error);
      toast.error("Erreur lors du chargement de la galerie.");
      setGalleryImages([]);
    } else {
      setGalleryImages(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image de votre galerie ?")) return;

    const { error } = await supabase
      .from('generated_images')
      .delete()
      .eq('id', id)
      .eq('user_id', session?.user?.id);

    if (error) {
      console.error("Error deleting image from gallery:", error);
      toast.error("Erreur lors de la suppression de l'image.");
    } else {
      toast.success("Image supprimée de la galerie.");
      fetchGalleryImages(); // Refresh the list
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
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

  if (!session) {
    return (
      <motion.div
        className="min-h-[calc(100vh-16rem)] py-12 text-center text-vf-gray"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-vf-blue text-center mb-10"
          variants={itemVariants}
        >
          Ta Galerie de Créations
        </motion.h1>
        <motion.p
          className="text-base sm:text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Veuillez vous connecter pour voir et gérer vos créations.
        </motion.p>
        <VisuaForgeButton onClick={() => window.location.href = '/login'} className="mt-4">
          Se connecter
        </VisuaForgeButton>
      </motion.div>
    );
  }

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
        Ta Galerie de Créations
      </motion.h1>
      <motion.p
        className="text-base sm:text-xl text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Retrouve toutes tes images générées et modifiées ici.
      </motion.p>

      {loading ? (
        <div className="flex justify-center items-center h-60 text-vf-gray text-xl">Chargement de la galerie...</div>
      ) : galleryImages.length > 0 ? (
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
                src={image.image_url}
                alt={image.prompt || `Image ${image.mode}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm sm:text-lg text-white font-medium">{image.prompt || `Image ${image.mode}`}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center text-vf-gray mt-20"
          variants={itemVariants}
        >
          <Image className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 text-vf-purple" />
          <p className="text-xl sm:text-2xl">Aucune création pour le moment.</p>
          <p className="text-base sm:text-lg">Commence à générer ou modifier des images pour les voir apparaître ici !</p>
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
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-vf-blue mb-4">{selectedImage.prompt || `Image ${selectedImage.mode}`}</h2>
            <p className="text-sm text-vf-gray mb-4">Créé le: {format(new Date(selectedImage.created_at), 'dd MMMM yyyy HH:mm', { locale: fr })}</p>
            <img src={selectedImage.image_url} alt={selectedImage.prompt || `Image ${selectedImage.mode}`} className="w-full h-auto rounded-lg mb-4" />
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <VisuaForgeButton size="sm" className="text-sm sm:text-base" onClick={() => handleDownload(selectedImage.image_url, selectedImage.prompt || `Image ${selectedImage.mode}`)}>
                <Download className="mr-2 h-4 w-4" /> Télécharger
              </VisuaForgeButton>
              <VisuaForgeButton variant="outline" size="sm" className="text-sm sm:text-base" onClick={() => handleShare(selectedImage.image_url)}>
                <Share2 className="mr-2 h-4 w-4" /> Partager
              </VisuaForgeButton>
              <VisuaForgeButton variant="destructive" size="sm" className="text-sm sm:text-base" onClick={() => handleDelete(selectedImage.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
              </VisuaForgeButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Gallery;