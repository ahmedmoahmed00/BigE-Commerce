import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { LuTags, LuUsers } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const setActive = ({ isActive }: { isActive: boolean }) => {
    const baseStyle =
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";

    return isActive
      ? `${baseStyle} bg-blue-100 text-secondary`
      : `${baseStyle} hover:bg-gray-100`;
  };
  return (
    <nav className="bg-primary rounded-2xl p-4 shadow-sm sticky top-24 w-full">
      <ul className="space-y-2">
        <li>
          <NavLink end className={setActive} to="/admin">
            <MdOutlineDashboard className="size-5" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={setActive} to="/admin/products">
            <FiPackage className="size-5" />
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={setActive} to="/admin/categories">
            <LuTags className="size-5" />
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={setActive} to="/admin/orders">
            <FiShoppingBag className="size-5" />
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={setActive} to="/admin/users">
            <LuUsers className="size-5" />
            <span>Users</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AdminSidebar;
