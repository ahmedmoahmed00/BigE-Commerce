import { NavLink } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuthContext";

function AccountSidebar() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }
  const DefaultAvatar = `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`;

  const avatarUser = user?.avatar_url || DefaultAvatar;

  const setActive = ({ isActive }: { isActive: boolean }) => {
    const baseStyle =
      "inline-block w-full text-center lg:text-left px-4 py-2 rounded-lg transition-colors";

    return isActive
      ? `${baseStyle} bg-blue-100 text-secondary`
      : `${baseStyle} hover:bg-gray-100 text-gray-700`;
  };

  return (
    <aside className="w-full">
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-center">
          <img
            className="w-24 h-24 bg-blue-100 rounded-full "
            src={avatarUser || DefaultAvatar}
            alt="DefaultAvatar"
          />
        </div>
        <div className="text-center">
          <h2 className="font-semibold ">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <div>
        <nav className="space-y-2">
          <NavLink to={"/profile"} end className={setActive}>
            Profile Information
          </NavLink>
          <NavLink to={"/profile/orderhistory"} className={setActive}>
            Order History
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default AccountSidebar;
