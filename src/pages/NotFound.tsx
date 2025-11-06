import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-vf-dark text-white px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center bg-vf-dark/60 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-vf-gray max-w-md w-full">
        <h1 className="text-h1 font-bold mb-4 text-vf-blue">404</h1>
        <p className="text-h2 text-vf-gray mb-4">Oops! Page non trouvée</p>
        <a href="/" className="text-button-text text-vf-blue hover:text-vf-purple underline">
          Retourner à l'accueil
        </a>
      </div>
    </motion.div>
  );
};

export default NotFound;