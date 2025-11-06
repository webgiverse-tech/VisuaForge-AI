import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Image, PencilRuler, GalleryHorizontal, Crown, Layers, BookOpen, Code, Mail, Menu, LogIn, LogOut, LayoutDashboard, UserPlus, ChevronDown } from 'lucide-react';
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
import { useIsMobile } from '@/hooks/use-mobile'; // Import useIsMobile hook

const Navbar = () => {
  const { session, supabase, profile, isAdmin } = useSupabase(); // Get profile and isAdmin
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const isMobile = useIsMobile(); // Use the hook to determine if it's a mobile screen

  const navItems = [
    {
      name: 'Création',
      icon: Sparkles,
      submenu: [
        { name: 'Générer', path: '/generate', icon: Image },
        { name: 'Modifier', path: '/edit', icon: PencilRuler },
        { name: 'Galerie', path: '/gallery', icon: GalleryHorizontal },
      ],
    },
    {
      name: 'Découvrir',
      icon: Layers,
      submenu: [
        { name: 'Fonctionnalités', path: '/features', icon: Layers },
        { name: 'Mode d\'emploi', path: '/how-it-works', icon: BookOpen },
        { name: 'API', path: '/api-docs', icon: Code },
      ],
    },
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
        <Link to="/" className="flex items-center space-x-2 text-xl sm:text-2xl md:text-3xl font-bold text-vf-blue hover:text-vf-purple transition-colors duration-300">
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" />
          <span>VisuaForge AI</span>
        </Link>

        {/* Desktop Navigation (visible on lg screens and up) */}
        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            item.submenu ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <VisuaForgeButton variant="ghost" className="flex items-center space-x-2 text-vf-blue hover:text-vf-purple px-3 py-2">
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </VisuaForgeButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-vf-dark border-vf-gray text-white">
                  {item.submenu.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link to={subItem.path} className="flex items-center text-vf-blue hover:text-vf-purple text-base">
                        <subItem.icon className="mr-2 h-4 w-4" /> {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )
          ))}

          {session ? (
            <>
              <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"}>
                <VisuaForgeButton variant="ghost" size="sm" className="text-lg px-4 py-2">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Tableau de Bord
                </VisuaForgeButton>
              </Link>
              <VisuaForgeButton size="sm" variant="destructive" onClick={handleLogout} className="text-lg px-4 py-2">
                <LogOut className="mr-2 h-4 w-4" /> Déconnexion
              </VisuaForgeButton>
            </>
          ) : (
            <Link to="/login">
              <VisuaForgeButton size="sm" className="text-lg px-4 py-2">
                <LogIn className="mr-2 h-4 w-4" /> Se connecter
              </VisuaForgeButton>
            </Link>
          )}
        </div>

        {/* Mobile & Tablet Navigation (visible on screens smaller than lg) */}
        <div className="lg:hidden flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              {isMobile ? ( // Mobile button for screens < 768px
                <VisuaForgeButton variant="outline" size="icon" className="hover:bg-vf-gray/20 border-vf-blue text-vf-blue">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </VisuaForgeButton>
              ) : ( // Tablet button for screens >= 768px (but hidden on lg by parent div)
                <VisuaForgeButton variant="secondary" className="text-base px-4 py-2">
                  <Menu className="h-5 w-5 mr-2" /> Menu
                  <span className="sr-only">Toggle navigation menu</span>
                </VisuaForgeButton>
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-vf-dark border-vf-gray p-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  item.submenu ? (
                    <div key={item.name}>
                      <h3 className="flex items-center space-x-3 text-vf-blue text-base sm:text-lg font-semibold mb-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </h3>
                      <ul className="ml-6 space-y-2">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.path}
                              className="flex items-center space-x-3 text-vf-gray hover:text-vf-purple transition-colors text-sm sm:text-base font-medium"
                              onClick={() => setIsSheetOpen(false)}
                            >
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-base sm:text-lg font-medium"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                ))}
                <div className="border-t border-vf-gray pt-4 mt-4">
                  {session ? (
                    <>
                      <Link
                        to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                        className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-base sm:text-lg font-medium mb-2"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <LayoutDashboard className="mr-2 h-5 w-5" /> Tableau de Bord
                      </Link>
                      <VisuaForgeButton
                        variant="destructive"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center text-base sm:text-lg py-2"
                      >
                        <LogOut className="mr-2 h-5 w-5" /> Déconnexion
                      </VisuaForgeButton>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-base sm:text-lg font-medium mb-2"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        <LogIn className="mr-2 h-5 w-5" /> Se connecter
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-3 text-vf-blue hover:text-vf-purple transition-colors text-base sm:text-lg font-medium"
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