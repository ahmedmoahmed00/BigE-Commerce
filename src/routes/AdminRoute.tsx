import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuthContext";

interface Props {
  children: ReactNode;
}

function AdminRoute({ children }: Props) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
