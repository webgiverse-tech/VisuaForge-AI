import React from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { Mail, MessageSquare, Twitter, Github } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { VisuaForgeButton } from '@/components/VisuaForgeButton';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs du formulaire.");
      return;
    }
    // Simulate form submission
    console.log("Form submitted:", formData);
    toast.success("Votre message a été envoyé ! Nous vous répondrons bientôt.");
    setFormData({ name: '', email: '', message: '' });
  };

  const containerVariants: Variants = { // Explicitly type containerVariants
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = { // Explicitly type itemVariants
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

  return (
    <motion.div
      className="min-h-[calc(100vh-16rem)] py-12 px-4 sm:px-6 md:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-h1 font-bold text-vf-blue text-center mb-10"
        variants={itemVariants}
      >
        Contacte-nous
      </motion.h1>
      <motion.p
        className="text-p text-vf-gray text-center mb-12 max-w-[95%] sm:max-w-[80%] md:max-w-[70%] mx-auto"
        variants={itemVariants}
      >
        Une question, une suggestion ou besoin d'aide ? Notre équipe est là pour toi.
      </motion.p>

      <div className="max-w-[95%] sm:max-w-[80%] md:max-w-3xl mx-auto bg-vf-dark/60 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-vf-gray">
        <motion.form onSubmit={handleSubmit} className="space-y-6" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Label htmlFor="name" className="text-p text-vf-blue mb-2 block">Nom</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ton nom"
              value={formData.name}
              onChange={handleChange}
              className="bg-vf-gray/30 border-vf-gray text-p text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Label htmlFor="email" className="text-p text-vf-blue mb-2 block">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="ton.email@exemple.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-vf-gray/30 border-vf-gray text-p text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Label htmlFor="message" className="text-p text-vf-blue mb-2 block">Message</Label>
            <Textarea
              id="message"
              placeholder="Décris ton problème ou ta suggestion..."
              value={formData.message}
              onChange={handleChange}
              className="bg-vf-gray/30 border-vf-gray text-p text-white placeholder:text-vf-gray focus:border-vf-blue focus:ring-vf-blue h-32"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <VisuaForgeButton type="submit" className="w-full text-button-text py-3">
              <Mail className="mr-2 h-5 w-5" /> Envoyer le message
            </VisuaForgeButton>
          </motion.div>
        </motion.form>

        <motion.div className="mt-10 text-center" variants={itemVariants}>
          <h2 className="text-h2 font-bold text-vf-purple mb-6">Ou rejoins-nous sur :</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-vf-gray hover:text-vf-blue transition-colors duration-300">
              <MessageSquare size={32} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-vf-gray hover:text-vf-blue transition-colors duration-300">
              <Twitter size={32} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-vf-gray hover:text-vf-blue transition-colors duration-300">
              <Github size={32} />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;