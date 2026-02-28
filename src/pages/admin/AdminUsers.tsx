import InputSearch from "../../features/admin/components/shared/InputSearch";
import TableAdminUsers from "../../features/admin/components/users/TableAdminUsers";

function AdminUsers() {
  return (
    <div>
      <header className="mb-4">
        <h2 className="font-semibold ">Users Management</h2>
      </header>
      <main className="space-y-4">
        <InputSearch />

        <TableAdminUsers />
      </main>
    </div>
  );
}

export default AdminUsers;
