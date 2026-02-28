import { Link, Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import AdminSidebar from "../../features/admin/components/shared/AdminSidebar";

function AdminLayout() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <header className="flex flex-col lg:flex-row gap-2 items-center justify-between mb-8">
        <div className="w-full lg:w-fit">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="w-full lg:w-fit">
          <Link
            to={"/products"}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaArrowLeft />
            Back to Store
          </Link>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:max-w-70 w-full ">
          <AdminSidebar />
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
