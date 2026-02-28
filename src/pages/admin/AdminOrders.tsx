import FilterStatus from "../../features/admin/components/orders/FilterStatus";
import TabelAdminOrders from "../../features/admin/components/orders/TabelAdminOrders";
import InputSearch from "../../features/admin/components/shared/InputSearch";

function AdminOrders() {
  return (
    <div>
      <header className="flex flex-row gap-2 items-center justify-between ">
        <h2 className="font-semibold mr-auto">Orders Management</h2>
        <FilterStatus />
      </header>
      <main className="mt-6 space-y-6">
        <div>
          <InputSearch />
        </div>
        <div>
          <TabelAdminOrders />
        </div>
      </main>
    </div>
  );
}

export default AdminOrders;
