import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import BlogTag from "./pages/BlogTag";
import BlogAuthor from "./pages/BlogAuthor";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import AdminIndex from "@/cms/pages/AdminIndex";
import ContentEditor from "@/cms/pages/ContentEditor";
import Login from "@/cms/pages/Login";
import Signup from "@/cms/pages/Signup";
import ProtectedRoute from "@/cms/auth/ProtectedRoute";
import { AuthProvider } from "@/cms/auth/auth";
import PuckNative from "@/cms/pages/PuckNative";
import SiteLayout from "@/layouts/SiteLayout";
import { EditorProvider } from "@/puck/store";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <EditorProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/blog/category/:category" element={<BlogCategory />} />
              <Route path="/blog/tag/:tag" element={<BlogTag />} />
              <Route path="/blog/author/:author" element={<BlogAuthor />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/edit" element={<PuckNative />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminIndex />} />
              <Route path="/admin/:slug" element={<ContentEditor />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </EditorProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
