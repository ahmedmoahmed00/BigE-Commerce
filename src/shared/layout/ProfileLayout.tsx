import { Outlet } from "react-router-dom";
import AccountSidebar from "../../features/profile/components/AccountSidebar";

function ProfileLayout() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <header className="mb-8">
        <h1>My Profile</h1>
      </header>
      <main className="flex gap-8 flex-col lg:flex-row items-start relative">
        <div className="bg-primary w-full lg:sticky lg:top-24 lg:max-w-85 rounded-2xl p-6 shadow-sm">
          <AccountSidebar />
        </div>
        <div className="lg:flex-1 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ProfileLayout;
