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
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import ApiDocs from "./pages/ApiDocs";
import Contact from "./pages/Contact";
import Roadmap from "./pages/Roadmap";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; // New
import Register from "./pages/Register"; // New
import { SessionContextProvider } from "./components/SessionContextProvider"; // New

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SessionContextProvider> {/* Wrap with SessionContextProvider */}
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/generate" element={<Layout><GenerateImage /></Layout>} />
            <Route path="/edit" element={<Layout><EditImage /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/premium" element={<Layout><Premium /></Layout>} />
            <Route path="/features" element={<Layout><Features /></Layout>} />
            <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
            <Route path="/api-docs" element={<Layout><ApiDocs /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/roadmap" element={<Layout><Roadmap /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} /> {/* New Login Route */}
            <Route path="/register" element={<Layout><Register /></Layout>} /> {/* New Register Route */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SessionContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;