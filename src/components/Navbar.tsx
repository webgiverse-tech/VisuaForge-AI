import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Image, PencilRuler, GalleryHorizontal, Crown, Layers, BookOpen, Code, Mail, Menu, LogIn, LogOut, LayoutDashboard, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { VisuaForgeButton } from './VisuaForgeButton';
import { useSupabase } from './SessionContextProvider';

const Navbar = () => {
  const { session, supabase } = useSupabase();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    setIsSheetOpen(false); // Close sheet on logout
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-vf-dark/80 backdrop-blur-sm border-b border-vf-gray shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-vf-blue hover:text-vf-purple transition-colors duration-300">
          <Sparkles className="w-7 h-7 animate-pulse" />
          <span>VisuaForge AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
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

          {/* Admin Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <VisuaForgeButton variant="ghost" className="text-vf-blue hover:text-vf-purple">
                Admin
              </VisuaForgeButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-vf-dark border-vf-gray text-white">
              {session ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/dashboard" className="flex items-center text-vf-blue hover:text-vf-purple">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Tableau de Bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-vf-gray" />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-500 hover:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" /> Déconnexion
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center text-vf-blue hover:text-vf-purple">
                      <LogIn className="mr-2 h-4 w-4" /> Se connecter
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="flex items-center text-vf-blue hover:text-vf-purple">
                      <UserPlus className="mr-2 h-4 w-4" /> S'inscrire
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Login Button (visible if not logged in) */}
          {!session && (
            <Link to="/login">
              <VisuaForgeButton size="sm" className="text-lg px-4 py-2">
                <LogIn className="mr-2 h-4 w-4" /> Se connecter
              </VisuaForgeButton>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <VisuaForgeButton variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-vf-blue" />
                <span className="sr-only">Toggle navigation menu</span>
              </VisuaForgeButton>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-vf-dark border-vf-gray p-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-lg font-medium"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="border-t border-vf-gray pt-4 mt-4">
                  {session ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-lg font-medium mb-2"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <LayoutDashboard className="mr-2 h-5 w-5" /> Tableau de Bord Admin
                      </Link>
                      <VisuaForgeButton
                        variant="destructive"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center text-lg py-2"
                      >
                        <LogOut className="mr-2 h-5 w-5" /> Déconnexion
                      </VisuaForgeButton>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-lg font-medium mb-2"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <LogIn className="mr-2 h-5 w-5" /> Se connecter
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-lg font-medium"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <UserPlus className="mr-2 h-5 w-5" /> S'inscrire
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;