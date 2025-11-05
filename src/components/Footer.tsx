import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, MessageSquare } from 'lucide-react'; // Changed Discord to MessageSquare

const Footer = () => {
  return (
    <footer className="bg-vf-dark/80 backdrop-blur-sm border-t border-vf-gray py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-vf-gray">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
          <Link to="/terms" className="hover:text-vf-blue transition-colors duration-300">Conditions d'utilisation</Link>
          <Link to="/privacy" className="hover:text-vf-blue transition-colors duration-300">Politique de confidentialité</Link>
          <Link to="/api-docs" className="hover:text-vf-blue transition-colors duration-300">API Docs</Link>
          <Link to="/faq" className="hover:text-vf-blue transition-colors duration-300">FAQ</Link>
          <Link to="/roadmap" className="hover:text-vf-blue transition-colors duration-300">Roadmap</Link>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-vf-gray hover:text-vf-blue transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-vf-gray hover:text-vf-blue transition-colors duration-300">
            <Twitter size={24} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-vf-gray hover:text-vf-blue transition-colors duration-300">
            <MessageSquare size={24} /> {/* Changed Discord to MessageSquare */}
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} VisuaForge AI. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;