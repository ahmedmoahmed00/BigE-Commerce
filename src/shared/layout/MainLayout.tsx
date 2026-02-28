import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import useScrollToTop from "../hooks/useScrollToTop";

function MainLayout() {
  useScrollToTop();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondarybackground">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
