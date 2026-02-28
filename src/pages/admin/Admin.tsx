import { FiDollarSign } from "react-icons/fi";
import StatCard from "../../features/admin/components/admin/StatCard";
import useStats from "../../features/admin/hooks/useStats";
import { formatCurrency } from "../../shared/utils/helpers";
import { LuPackage, LuShoppingBag, LuUsers } from "react-icons/lu";
import TabelAdminDashboard from "../../features/admin/components/admin/TabelAdminDashboard";
import SkeletonStatCard from "../../features/admin/components/admin/SkeletonStatCard";

function Admin() {
  const { data: stats, isLoading } = useStats();

  const statItems = [
    {
      title: "Total Revenue",
      value: formatCurrency(Math.round(Number(stats?.total_revenue)) || 0),
      icon: FiDollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: String(stats?.total_orders || 0),
      icon: LuShoppingBag,
      color: "text-secondary",
    },
    {
      title: "Total Products",
      value: String(stats?.total_products || 0),
      icon: LuPackage,
      color: "text-purple-600",
    },
    {
      title: "Total Users",
      value: String(stats?.total_users || 0),
      icon: LuUsers,
      color: "text-secondary",
    },
  ];

  return (
    <div>
      <header className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)}
        {!isLoading &&
          stats &&
          statItems.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              Icon={item.icon}
              colorIcon={item.color}
            />
          ))}
      </header>
      <main className="mt-6">
        <h2 className="font-semibold mb-3 ">Recent Orders</h2>
        <TabelAdminDashboard />
      </main>
    </div>
  );
}

export default Admin;
