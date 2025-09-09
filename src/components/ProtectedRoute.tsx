import { useAuth } from '@/contexts/AuthContext';
import ComingSoon from '@/pages/ComingSoon';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <ComingSoon />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;