"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useSupabase } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { User, Image, Sparkles, CreditCard, Settings, Download, Share2, Trash2, BarChart, Zap, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'; // Import French locale for date formatting

interface GeneratedImage {
  id: string;
  image_url: string;
  prompt: string | null;
  style: string | null;
  mode: string;
  created_at: string;
}

const Dashboard = () => {
  const { session, profile, supabase } = useSupabase();
  const navigate = useNavigate();
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      fetchGeneratedImages();
    }
  }, [session, navigate]);

  const fetchGeneratedImages = async () => {
    setLoadingImages(true);
    const { data, error } = await supabase
      .from('generated_images')
      .select('*')
      .eq('user_id', session?.user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching generated images:", error);
      toast.error("Erreur lors du chargement de l'historique des images.");
    } else {
      setGeneratedImages(data || []);
    }
    setLoadingImages(false);
  };

  const handleDownload = (imageUrl: string, prompt: string | null) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `visuaforge-ai-${prompt ? prompt.substring(0, 20).replace(/\s/g, '-') : 'image'}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image téléchargée !");
  };

  const handleShare = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl);
    toast.info("Lien de l'image copié dans le presse-papiers !");
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;

    const { error } = await supabase
      .from('generated_images')
      .delete()
      .eq('id', imageId)
      .eq('user_id', session?.user?.id); // Ensure user can only delete their own images

    if (error) {
      console.error("Error deleting image:", error);
      toast.error("Erreur lors de la suppression de l'image.");
    } else {
      toast.success("Image supprimée avec succès !");
      fetchGeneratedImages(); // Refresh the list
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
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

  if (!session) {
    return null; // Redirect is handled by useEffect
  }

  const userName = profile?.first_name || session.user?.email?.split('@')[0] || 'Utilisateur';
  const userRole = profile?.role || 'user'; // Default to 'user' if not found

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-vf-blue text-center mb-4"
        variants={itemVariants}
      >
        Salut {userName}, prêt à créer quelque chose de grand ? 👋
      </motion.h1>
      <motion.p
        className="text-[clamp(1rem,2vw,1.25rem)] text-vf-gray text-center mb-12 max-w-3xl mx-auto"
        variants={itemVariants}
      >
        Bienvenue sur ton tableau de bord personnel VisuaForge AI.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* User Info & Plan Card */}
        <motion.div
          className="lg:col-span-1 bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col items-center text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 mb-4 border-2 border-vf-purple">
            <AvatarImage src={profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${userName}`} alt={userName} />
            <AvatarFallback className="bg-vf-purple text-white text-3xl">{userName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white mb-2">{userName}</h2>
          <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-vf-gray mb-4">Plan actuel : <span className="font-semibold text-vf-blue">{userRole === 'admin' ? 'Admin' : 'Free'}</span></p> {/* Placeholder for plan */}
          <VisuaForgeButton variant="default" size="sm" className="mt-auto text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
            <Crown className="mr-2 h-4 w-4" /> Mettre à niveau vers Pro
          </VisuaForgeButton>
        </motion.div>

        {/* Generation History Card */}
        <motion.div
          className="lg:col-span-2 bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray"
          variants={itemVariants}
          whileHover={{ scale: 1.01, boxShadow: "0 0 25px rgba(138, 43, 226, 0.3)" }}
        >
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-vf-purple mb-6 flex items-center">
            <Image className="mr-3 h-6 w-6" /> Historique de générations
          </h2>
          {loadingImages ? (
            <div className="flex justify-center items-center h-40 text-vf-gray">Chargement des images...</div>
          ) : generatedImages.length === 0 ? (
            <div className="text-center text-vf-gray py-10">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-vf-blue" />
              <p className="text-[clamp(1rem,2vw,1.25rem)]">Aucune image générée ou modifiée pour le moment.</p>
              <p className="text-[clamp(0.8rem,1.5vw,1rem)] mt-2">Commence à créer pour les voir apparaître ici !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {generatedImages.map((img) => (
                <motion.div
                  key={img.id}
                  className="relative group overflow-hidden rounded-lg shadow-lg border border-vf-gray"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 191, 255, 0.4)" }}
                  transition={{ duration: 0.2 }}
                >
                  <img src={img.image_url} alt={img.prompt || "Image générée"} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-vf-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-[clamp(0.75rem,1.2vw,0.9rem)] text-white font-medium mb-1 truncate">{img.prompt || `Image ${img.mode}`}</p>
                    <p className="text-[clamp(0.65rem,1vw,0.8rem)] text-vf-gray mb-2">{format(new Date(img.created_at), 'dd MMMM yyyy HH:mm', { locale: fr })}</p>
                    <div className="flex space-x-2">
                      <VisuaForgeButton variant="secondary" size="sm" className="text-[clamp(0.6rem,1vw,0.75rem)] px-2 py-1 h-auto" onClick={() => handleDownload(img.image_url, img.prompt)}>
                        <Download className="h-3 w-3 mr-1" />
                      </VisuaForgeButton>
                      <VisuaForgeButton variant="outline" size="sm" className="text-[clamp(0.6rem,1vw,0.75rem)] px-2 py-1 h-auto" onClick={() => handleShare(img.image_url)}>
                        <Share2 className="h-3 w-3 mr-1" />
                      </VisuaForgeButton>
                      <VisuaForgeButton variant="destructive" size="sm" className="text-[clamp(0.6rem,1vw,0.75rem)] px-2 py-1 h-auto" onClick={() => handleDelete(img.id)}>
                        <Trash2 className="h-3 w-3 mr-1" />
                      </VisuaForgeButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Personal Stats Card */}
        <motion.div
          className="lg:col-span-1 bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-vf-blue mb-6 flex items-center">
            <BarChart className="mr-3 h-6 w-6" /> Statistiques personnelles
          </h2>
          <div className="space-y-4 text-[clamp(0.9rem,1.5vw,1.1rem)]">
            <p className="flex justify-between items-center">Total de générations : <span className="font-semibold text-white">{generatedImages.length}</span></p>
            <p className="flex justify-between items-center">Générations restantes : <span className="font-semibold text-white">Illimité (Free)</span></p> {/* Placeholder */}
            <p className="text-vf-gray italic">Graphique d'évolution hebdomadaire (à venir)</p>
          </div>
        </motion.div>

        {/* Plan & Subscription Card */}
        <motion.div
          className="lg:col-span-1 bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(138, 43, 226, 0.3)" }}
        >
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-vf-purple mb-6 flex items-center">
            <CreditCard className="mr-3 h-6 w-6" /> Plan & Abonnement
          </h2>
          <div className="space-y-4 text-[clamp(0.9rem,1.5vw,1.1rem)]">
            <p>Ton plan actuel : <span className="font-semibold text-vf-blue">{userRole === 'admin' ? 'Admin' : 'Free'}</span></p>
            <VisuaForgeButton variant="default" size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
              <Zap className="mr-2 h-4 w-4" /> Mettre à niveau vers Pro
            </VisuaForgeButton>
            <p className="text-vf-gray italic">Historique des paiements (à venir)</p>
          </div>
        </motion.div>

        {/* Account Settings Card */}
        <motion.div
          className="lg:col-span-1 bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray flex flex-col"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)" }}
        >
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-vf-blue mb-6 flex items-center">
            <Settings className="mr-3 h-6 w-6" /> Paramètres du compte
          </h2>
          <div className="space-y-4 text-[clamp(0.9rem,1.5vw,1.1rem)]">
            <VisuaForgeButton variant="outline" size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
              Modifier le profil
            </VisuaForgeButton>
            <VisuaForgeButton variant="outline" size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
              Changer le mot de passe
            </VisuaForgeButton>
            <VisuaForgeButton variant="destructive" size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
              Supprimer le compte
            </VisuaForgeButton>
            <p className="text-vf-gray italic">Préférences UI (thème, notifications) (à venir)</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;