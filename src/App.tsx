import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import BlogTag from "./pages/BlogTag";
import BlogAuthor from "./pages/BlogAuthor";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
            <Routes>
              {/* Admin routes - protected */}
              {/* Main app routes - all protected except coming soon */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/blog" element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              } />
              <Route path="/blog/:slug" element={
                <ProtectedRoute>
                  <BlogPost />
                </ProtectedRoute>
              } />
              <Route path="/blog/category/:category" element={
                <ProtectedRoute>
                  <BlogCategory />
                </ProtectedRoute>
              } />
              <Route path="/blog/tag/:tag" element={
                <ProtectedRoute>
                  <BlogTag />
                </ProtectedRoute>
              } />
              <Route path="/blog/author/:author" element={
                <ProtectedRoute>
                  <BlogAuthor />
                </ProtectedRoute>
              } />
              <Route path="/terms-conditions" element={
                <ProtectedRoute>
                  <TermsConditions />
                </ProtectedRoute>
              } />
              <Route path="/privacy-policy" element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              } />
            </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;