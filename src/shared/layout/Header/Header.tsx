import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { LuPackage } from "react-icons/lu";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import MobileHeader from "./MobileHeader";
import { useCart } from "../../../features/cart/hooks/useCart";
import useSignOut from "../../../features/auth/hooks/useSignOut";
import useAuth from "../../../features/auth/hooks/useAuthContext";
import Loader from "../../components/ui/Loader";

function Header() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { mutate: signOut, isPending } = useSignOut();

  const DefaultAvatar = `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`;

  const avatarUser = user?.avatar_url || DefaultAvatar;

  const { quantityAllItems } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-secondary relative before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-secondary before:scale-x-100 before:origin-left before:transition-transform before:duration-300"
      : "hover:text-secondary relative before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-secondary before:scale-x-0 hover:before:scale-x-100 before:origin-right hover:before:origin-left before:transition-transform before:duration-300";

  const handelSignOut = () => {
    signOut();
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <header className=" border-b bg-primary border-b-accent/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <LuPackage className="text-secondary text-3xl" />
            <span className="text-accent font-semibold text-xl">ShopHub</span>
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3 lg:gap-6 text-accent ">
            <li>
              <NavLink className={setActiveClass} to={"/"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={setActiveClass} to={"/products"}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className={setActiveClass} to={"/categories"}>
                Categories
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="text-accent hover:text-secondary duration-200 text-2xl relative"
            to="/cart"
            aria-label="Open cart"
          >
            {quantityAllItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {quantityAllItems}
              </span>
            )}
            <FiShoppingCart />
          </Link>
          {isAdmin && (
            <Link
              className=" lg:flex items-center gap-2 py-1 px-2 lg:py-2 lg:px-3 hover:cursor-pointer hover:bg-bghover  rounded-lg"
              to={"/admin"}
            >
              <span className="text-xl ">
                <MdOutlineDashboard />
              </span>
              <span>Admin</span>
            </Link>
          )}

          {isAuthenticated && (
            <Link
              className="hidden lg:flex items-center gap-2 py-1 px-2 lg:py-2 lg:px-3 hover:cursor-pointer hover:bg-bghover  rounded-lg"
              to={"/profile"}
            >
              <div className="size-8 rounded-full overflow-hidden border border-gray-200">
                <img
                  className="h-full w-full object-cover"
                  src={avatarUser}
                  referrerPolicy="no-referrer"
                  alt={user?.name || "User profile"}
                />
              </div>
              <span>
                {user?.name && user?.name?.length > 8
                  ? user?.name?.slice(0, 8) + ".."
                  : user?.name}
              </span>
            </Link>
          )}

          {isAuthenticated && (
            <button
              disabled={isPending}
              onClick={handelSignOut}
              className="hidden lg:flex items-center gap-2 py-1 px-2 lg:py-2 lg:px-3 hover:cursor-pointer hover:bg-bghover  rounded-lg"
            >
              <span className="text-xl ">
                <MdLogout />
              </span>
              <span>Logout</span>
            </button>
          )}
          {!isAuthenticated && (
            <Link
              className="px-4 py-2 hidden lg:block rounded-lg bg-secondary hover:bg-blue-700 duration-200 text-primary"
              to={"/login"}
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Menu Button"
            className=" text-2xl lg:hidden text-accent cursor-pointer hover:text-secondary duration-200"
          >
            <FaBars />
          </button>
        </div>
      </div>
      <div>
        <MobileHeader
          AvatarUser={avatarUser}
          handelSignOut={handelSignOut}
          isAuthenticated={isAuthenticated}
          userName={user?.name}
          isAdmin={isAdmin}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setActiveClass={setActiveClass}
        />
      </div>
    </header>
  );
}

export default Header;
