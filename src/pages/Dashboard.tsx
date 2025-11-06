"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useSupabase } from '@/components/SessionContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { User, Image, Sparkles, CreditCard, Settings, Download, Share2, Trash2, BarChart, Zap, Crown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import ScannerLoader from '@/components/ScannerLoader'; // Import ScannerLoader

interface GeneratedImage {
  id: string;
  image_url: string;
  prompt: string | null;
  style: string | null;
  mode: string;
  created_at: string;
}

const formSchema = z.object({
  email: z.string().email("Adresse e-mail invalide").optional(),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const Dashboard = () => {
  const { session, profile, supabase } = useSupabase();
  const navigate = useNavigate();
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [filterMode, setFilterMode] = useState<'all' | 'generate' | 'edit'>('all');
  const [chartData, setChartData] = useState<any[]>([]);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: session?.user?.email || '',
      password: '',
    },
  });

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      form.reset({
        email: session.user?.email || '',
        password: '',
      });
      fetchGeneratedImages();
    }
  }, [session, navigate, filterMode]);

  useEffect(() => {
    if (generatedImages.length > 0) {
      processChartData(generatedImages);
    }
  }, [generatedImages]);

  const fetchGeneratedImages = async () => {
    setLoadingImages(true);
    let query = supabase
      .from('generated_images')
      .select('*')
      .eq('user_id', session?.user?.id)
      .order('created_at', { ascending: false });

    if (filterMode !== 'all') {
      query = query.eq('mode', filterMode);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching generated images:", error);
      toast.error("Erreur lors du chargement de l'historique des images.");
    } else {
      setGeneratedImages(data || []);
    }
    setLoadingImages(false);
  };

  const processChartData = (images: GeneratedImage[]) => {
    const dailyCounts: { [key: string]: number } = {};
    images.forEach(img => {
      const date = format(new Date(img.created_at), 'yyyy-MM-dd');
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const sortedDates = Object.keys(dailyCounts).sort();
    const last7Days = sortedDates.slice(-7); // Get data for the last 7 days

    const data = last7Days.map(date => ({
      name: format(new Date(date), 'dd/MM', { locale: fr }),
      generations: dailyCounts[date],
    }));
    setChartData(data);
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
      .eq('user_id', session?.user?.id);

    if (error) {
      console.error("Error deleting image:", error);
      toast.error("Erreur lors de la suppression de l'image.");
    } else {
      toast.success("Image supprimée avec succès !");
      fetchGeneratedImages();
    }
  };

  const handleProfileUpdate = async (values: ProfileFormValues) => {
    setIsUpdatingProfile(true);
    try {
      const { email, password } = values;
      const updateData: { email?: string; password?: string } = {};

      if (email && email !== session?.user?.email) {
        updateData.email = email;
      }
      if (password) {
        updateData.password = password;
      }

      if (Object.keys(updateData).length === 0) {
        toast.info("Aucune modification à enregistrer.");
        return;
      }

      const { error } = await supabase.auth.updateUser(updateData);

      if (error) {
        throw error;
      }

      toast.success("Profil mis à jour avec succès !");
      form.reset({ email: email || session?.user?.email, password: '' }); // Reset form with new email, clear password
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(`Erreur lors de la mise à jour du profil: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleDeleteAccount = async () => {
    // In a real application, this would trigger a server-side function
    // to delete the user and all associated data, as client-side deletion
    // of the current user is not directly supported by Supabase client.
    // For now, we'll just sign out and inform the user.
    await supabase.auth.signOut();
    toast.info("Votre compte a été déconnecté. Pour une suppression complète, veuillez contacter le support.");
    navigate('/login');
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
    return null;
  }

  const userName = profile?.first_name || session.user?.email?.split('@')[0] || 'Utilisateur';
  const userRole = profile?.role || 'user';

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] py-12 px-4 relative z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section
        className="text-center mb-20 bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray animate-fade-in"
        variants={itemVariants}
      >
        <motion.h1
          className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-vf-blue to-vf-purple mb-4 leading-tight animate-pulse-light"
          variants={itemVariants}
        >
          👋 Bonjour {userName}, prêt à créer une nouvelle œuvre aujourd’hui ?
        </motion.h1>
        <motion.p
          className="text-[clamp(1rem,2vw,1.25rem)] text-vf-gray mb-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Explore tes créations, suis ta progression et gère ton compte.
        </motion.p>
        <Link to="/generate">
          <VisuaForgeButton size="lg" className="text-[clamp(1rem,2vw,1.25rem)] px-8 py-4 animate-glow">
            <Sparkles className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Créer une image maintenant
          </VisuaForgeButton>
        </Link>
      </motion.section>

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
          <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-vf-gray mb-4">Plan actuel : <span className="font-semibold text-vf-blue">{userRole === 'admin' ? 'Admin' : 'Free'}</span></p>
          <Link to="/premium" className="w-full">
            <VisuaForgeButton variant="default" size="sm" className="mt-auto text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2 w-full">
              <Crown className="mr-2 h-4 w-4" /> Mettre à niveau vers Pro
            </VisuaForgeButton>
          </Link>
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
          <div className="mb-6 flex justify-end">
            <Select value={filterMode} onValueChange={(value: 'all' | 'generate' | 'edit') => setFilterMode(value)}>
              <SelectTrigger className="w-[180px] bg-vf-gray/30 border-vf-gray text-white">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent className="bg-vf-dark border-vf-gray text-white">
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="generate">Générations</SelectItem>
                <SelectItem value="edit">Modifications</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {loadingImages ? (
            <div className="flex justify-center items-center h-40">
              <ScannerLoader className="w-16 h-16" />
            </div>
          ) : generatedImages.length === 0 ? (
            <div className="text-center text-vf-gray py-10">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-vf-blue" />
              <p className="text-[clamp(1rem,2vw,1.25rem)]">Aucune image générée ou modifiée pour le moment.</p>
              <p className="text-[clamp(0.8rem,1.5vw,1rem)] mt-2">Commence à créer pour les voir apparaître ici !</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {generatedImages.map((img) => (
                <motion.div
                  key={img.id}
                  className="relative group overflow-hidden rounded-lg shadow-lg border border-vf-gray"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 191, 255, 0.4)", rotateY: 5, rotateX: 5 }}
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
            </motion.div>
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
            <p className="flex justify-between items-center">Générations restantes : <span className="font-semibold text-white">Illimité (Free)</span></p>
            <motion.div
              className="mt-6 h-40 w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#A0A0A0" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#A0A0A0" tick={{ fontSize: 10 }} />
                  <Tooltip cursor={{ fill: 'rgba(0, 191, 255, 0.1)' }} contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #00BFFF', borderRadius: '8px' }} itemStyle={{ color: '#00BFFF' }} />
                  <Bar dataKey="generations" fill="#8A2BE2" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
              <p className="text-vf-gray italic text-center text-sm mt-2">Générations des 7 derniers jours</p>
            </motion.div>
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
            <Link to="/premium" className="w-full">
              <VisuaForgeButton variant="default" size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
                <Zap className="mr-2 h-4 w-4" /> Mettre à niveau vers Pro
              </VisuaForgeButton>
            </Link>
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
          <form onSubmit={form.handleSubmit(handleProfileUpdate)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[clamp(0.8rem,1.5vw,1rem)] text-vf-blue mb-2 block">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                className="bg-vf-gray/30 border-vf-gray text-[clamp(0.8rem,1.5vw,1rem)] text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-[clamp(0.8rem,1.5vw,1rem)] text-vf-blue mb-2 block">Nouveau mot de passe</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder="Laisser vide pour ne pas changer"
                className="bg-vf-gray/30 border-vf-gray text-[clamp(0.8rem,1.5vw,1rem)] text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue"
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
            <VisuaForgeButton type="submit" disabled={isUpdatingProfile} size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
              {isUpdatingProfile ? 'Mise à jour...' : 'Mettre à jour le profil'}
            </VisuaForgeButton>
          </form>
          <div className="mt-6 space-y-2">
            <VisuaForgeButton variant="outline" size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
              Préférences UI (à venir)
            </VisuaForgeButton>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <VisuaForgeButton variant="destructive" size="sm" className="w-full text-[clamp(0.8rem,1.5vw,1rem)] px-4 py-2">
                  Supprimer le compte
                </VisuaForgeButton>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-vf-dark border-vf-blue text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-vf-blue">Êtes-vous absolument sûr ?</AlertDialogTitle>
                  <AlertDialogDescription className="text-vf-gray">
                    Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte et toutes vos données de nos serveurs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-vf-gray/30 text-white hover:bg-vf-gray/50 border-vf-gray">Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 text-white hover:bg-red-700">Supprimer mon compte</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;