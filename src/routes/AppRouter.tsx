import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import { CartContextProvider } from "../features/cart/context/CartContext";
import AuthLayout from "../shared/layout/AuthLayout";
import { AuthProvider } from "../features/auth/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import {
  adminRoutes,
  authRoutes,
  profileRoutes,
  protectedRoutes,
} from "./routes";
import GuestRoute from "./GuestRoute";
import ProfileLayout from "../shared/layout/ProfileLayout";
import AdminRoute from "./AdminRoute";
import AdminLayout from "../shared/layout/AdminLayout";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      ...protectedRoutes,
      {
        path: "profile",
        element: <ProfileLayout />,
        children: profileRoutes,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: adminRoutes,
      },
    ],
  },
  {
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: authRoutes,
  },
]);

function AppRouter() {
  return (
    <AuthProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthProvider>
  );
}

export default AppRouter;
