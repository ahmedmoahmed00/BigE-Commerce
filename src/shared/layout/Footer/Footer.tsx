import { LuPackage } from "react-icons/lu";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 py-12 px-4">
      <div className="container mx-auto text-primary grid grid-cols-1 md:grid-cols-4  gap-4 lg:gap-8 ">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 ">
            <span>
              <LuPackage className="text-2xl text-secondary" />
            </span>
            <span className="text-lg font-semibold">ShopHub</span>
          </div>
          <p className="text-gray-300 text-sm">
            Your one-stop shop for everything you need. Quality products at
            great prices.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg ">Shop</h3>
          <ul className="text-sm text-gray-300 space-y-2 ">
            <li className="hover:text-white duration-200">
              <Link to="/products">All Products</Link>
            </li>
            <li className="hover:text-white duration-200">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="hover:text-white duration-200">
              <Link to="/cart">Shopping Cart</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg ">Account</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="hover:text-white duration-200">
              <Link to="/profile">My Profile</Link>
            </li>
            <li className="hover:text-white duration-200">
              <Link to="/profile">Order History</Link>
            </li>
            <li className="hover:text-white duration-200">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg ">Contact Us</h3>
          <p className="text-sm text-gray-300">
            123 E-commerce St.
            <br />
            Shop City, SC 12345
            <br />
            Email:
            <a
              href="mailto:contact@shophub.com"
              className="hover:text-white duration-200"
            >
              contact@shophub.com
            </a>
          </p>
        </div>
      </div>
      <div className="container mx-auto ">
        <hr className="my-8 border-gray-800" />
        <p className="text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
