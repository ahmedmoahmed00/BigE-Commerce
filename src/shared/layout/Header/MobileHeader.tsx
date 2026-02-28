import { IoMdClose } from "react-icons/io";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useOutsideClick } from "../../../shared/hooks/useOutsideClick";
import { useEffect } from "react";

type MobileHeaderProps = {
  AvatarUser: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userName?: string;
  setActiveClass: ({ isActive }: { isActive: boolean }) => string;
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  handelSignOut: () => void;
};

function MobileHeader({
  AvatarUser,
  isAuthenticated,
  isAdmin,
  userName,
  setActiveClass,
  setIsMenuOpen,
  isMenuOpen,
  handelSignOut,
}: MobileHeaderProps) {
  const location = useLocation();
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsMenuOpen(false);
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, setIsMenuOpen]);

  return (
    <>
      <div
        ref={ref}
        className={`${isMenuOpen ? "translate-x-0" : "translate-x-full"} right-0 duration-300 fixed text-accent lg:hidden bg-white z-11  top-0 bottom-0 w-80`}
      >
        <div className="flex items-center p-4 justify-between border-b pb-4 border-b-gray-300">
          <h2 className="text-xl">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer text-2xl"
            aria-label="Close Menu"
          >
            <IoMdClose />
          </button>
        </div>
        <div className="lg:hidden p-4 ">
          <ul className="flex flex-col font-semibold gap-3 lg:gap-6 text-accent border-b pb-4 border-b-gray-300">
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
        <div className="flex flex-col font-semibold gap-3 lg:gap-6 text-accent border-b p-4 pt-0 border-b-gray-300">
          {isAdmin && (
            <Link
              className="lg:hidden flex items-center gap-2  lg:py-2 lg:px-3 hover:cursor-pointer hover:bg-bghover  rounded-lg"
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
              className="lg:hidden flex items-center gap-2  lg:py-2 lg:px-3 hover:cursor-pointer hover:bg-bghover  rounded-lg"
              to={"/profile"}
            >
              <div className="size-8 rounded-full overflow-hidden border border-gray-200">
                <img
                  className="h-full w-full object-cover"
                  src={AvatarUser}
                  referrerPolicy="no-referrer"
                  alt={"User profile"}
                />
              </div>
              <span>
                {userName && userName.length > 8
                  ? userName.slice(0, 8) + ".."
                  : userName}
              </span>
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={handelSignOut}
              className="lg:hidden flex items-center gap-2  lg:py-2 lg:px-3 hover:cursor-pointer hover:bg-bghover  rounded-lg"
            >
              <span className="text-xl ">
                <MdLogout />
              </span>
              <span>Logout</span>
            </button>
          )}
          {!isAuthenticated && (
            <Link
              className="px-4 py-2 w-fit lg:hidden block rounded-lg bg-secondary hover:bg-blue-700 duration-200 text-primary"
              to={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {isMenuOpen && <div className="overlay lg:hidden"></div>}
    </>
  );
}

export default MobileHeader;
