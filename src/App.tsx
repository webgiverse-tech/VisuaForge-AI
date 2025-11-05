import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import GenerateImage from "./pages/GenerateImage";
import EditImage from "./pages/EditImage";
import Gallery from "./pages/Gallery";
import Premium from "./pages/Premium";
import Features from "./pages/Features"; // New page
import HowItWorks from "./pages/HowItWorks"; // New page
import ApiDocs from "./pages/ApiDocs";     // New page
import Contact from "./pages/Contact";     // New page
import Roadmap from "./pages/Roadmap";     // New page
import Terms from "./pages/Terms";         // New page
import Privacy from "./pages/Privacy";       // New page
import FAQ from "./pages/FAQ";             // New page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/generate" element={<GenerateImage />} />
            <Route path="/edit" element={<EditImage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;