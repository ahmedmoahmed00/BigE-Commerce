import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuthContext";
import Loader from "../shared/components/ui/Loader";

interface Props {
  children: ReactNode;
}
function GuestRoute({ children }: Props) {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader />;

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}

export default GuestRoute;
