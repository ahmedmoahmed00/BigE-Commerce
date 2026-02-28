import { lazy, Suspense } from "react";
import Login from "../pages/AuthPages/Login";
import Signup from "../pages/AuthPages/Signup";
import Cart from "../pages/Cart";
import CategoryPage from "../pages/CategoryPage";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage";
import Loader from "../shared/components/ui/Loader";
import ProfileInformation from "../pages/profile/ProfileInformation";
import OrderHistory from "../pages/profile/OrderHistory";
import Admin from "../pages/admin/Admin";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";

const SuccessPage = lazy(() => import("../pages/Success"));

export const authRoutes = [
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
];
export const protectedRoutes = [
  { index: true, element: <Home /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:productId", element: <ProductDetailsPage /> },
  { path: "/categories", element: <CategoryPage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },

  {
    path: "/success",
    element: (
      <Suspense fallback={<Loader />}>
        <SuccessPage />
      </Suspense>
    ),
  },
];

export const profileRoutes = [
  {
    index: true,
    element: <ProfileInformation />,
  },
  {
    path: "orderhistory",
    element: <OrderHistory />,
  },
];

export const adminRoutes = [
  { index: true, element: <Admin /> },
  { path: "products", element: <AdminProducts /> },
  { path: "categories", element: <AdminCategories /> },
  { path: "orders", element: <AdminOrders /> },
  { path: "users", element: <AdminUsers /> },
];
