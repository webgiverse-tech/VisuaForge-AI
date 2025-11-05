import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Image, PencilRuler, GalleryHorizontal, Crown, Layers, BookOpen, Code, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const navItems = [
    { name: 'Générer', path: '/generate', icon: Image },
    { name: 'Modifier', path: '/edit', icon: PencilRuler },
    { name: 'Galerie', path: '/gallery', icon: GalleryHorizontal },
    { name: 'Fonctionnalités', path: '/features', icon: Layers },
    { name: 'Mode d\'emploi', path: '/how-it-works', icon: BookOpen },
    { name: 'API', path: '/api-docs', icon: Code },
    { name: 'Premium', path: '/premium', icon: Crown },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-vf-dark/80 backdrop-blur-sm border-b border-vf-gray shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-vf-blue hover:text-vf-purple transition-colors duration-300">
          <Sparkles className="w-7 h-7 animate-pulse" />
          <span>VisuaForge AI</span>
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-2 text-vf-blue hover:text-vf-purple transition-all duration-300",
                "relative group"
              )}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium">
                {item.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vf-purple group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;