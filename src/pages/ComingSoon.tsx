import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, ArrowRight } from "lucide-react";

const ComingSoon = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(password);
    if (!success) {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
    // If successful, the ProtectedRoute will automatically show the protected content
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1),transparent_50%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-lg space-y-12 relative z-10">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/007de019-e0b0-490d-90cd-cced1de404b8.png" 
            alt="The Academy of Dance" 
            className="h-20 md:h-24 w-auto mx-auto mb-8 object-contain drop-shadow-2xl" 
          />
        </div>

        {/* Coming Soon Section */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins tracking-tight">
              Coming Soon
            </h1>
            <p className="text-xl text-gray-300 font-poppins max-w-md mx-auto leading-relaxed">
              We're crafting something extraordinary. 
              <span className="block mt-2 text-gray-400">Stay tuned for the grand reveal!</span>
            </p>
          </div>

          {/* Modern Admin Access */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 font-poppins mb-3">Admin Access</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password to continue"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-gray-500 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {error && (
                <div className="text-center">
                  <p className="text-red-400 text-xs font-poppins bg-red-500/10 rounded-lg py-2 px-3 border border-red-500/20">
                    {error}
                  </p>
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-poppins font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 flex items-center justify-center space-x-2 text-sm"
              >
                <span>Access Site</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-8">
            <p className="text-gray-500 text-sm font-poppins">
              Something extraordinary is brewing...
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-gray-600 text-xs font-poppins">
            © 2024 The Academy of Dance. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
