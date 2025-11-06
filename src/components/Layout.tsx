import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-vf-dark text-white font-sans">
      <ParticleBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 sm:px-6 md:px-8 max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;