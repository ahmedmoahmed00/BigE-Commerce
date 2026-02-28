import { IoShieldOutline } from "react-icons/io5";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import useGetUsersDetails from "../../hooks/users/useGetUsersDetails";
import Pagination from "../shared/Pagination";
import { Table } from "../shared/Tabel";
import Spinner from "../../../../shared/components/ui/Spinner";
import { useState } from "react";
import { formattedDate } from "../../../../shared/utils/helpers";
import useUpdateUsers from "../../hooks/users/useUpdateUsers";
import useAuth from "../../../auth/hooks/useAuthContext";

function TableAdminUsers() {
  const { usersDetails, count, isLoading } = useGetUsersDetails();
  const [pendingRolesUpdates, setPendingRolesUpdates] = useState<
    Record<string, string>
  >({});

  const { user: currentUser } = useAuth();
  const { mutate: updateUsers, isPending } = useUpdateUsers();

  const usersUpdated = Object.entries(pendingRolesUpdates).map(
    ([id, role]) => ({
      id,
      role,
    }),
  );

  const lengthPendingRoles = usersUpdated.length;

  const handleRoleChange = (
    userId: string,
    newRoleUser: string,
    originalRoleUser: string,
  ) => {
    if (currentUser?.id === userId) {
      return;
    }

    setPendingRolesUpdates((prev) => {
      if (newRoleUser === originalRoleUser) {
        const newState = { ...prev };
        delete newState[userId];
        return newState;
      }
      return { ...prev, [userId]: newRoleUser };
    });
  };

  const handleUpdateUsers = () => {
    updateUsers(usersUpdated, {
      onSuccess: () => {
        setPendingRolesUpdates({});
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Heading>User</Table.Heading>
            <Table.Heading>Email</Table.Heading>
            <Table.Heading>Role</Table.Heading>
            <Table.Heading>Joined</Table.Heading>
            <Table.Heading>Actions</Table.Heading>
          </Table.Header>

          <Table.Body
            data={usersDetails}
            render={(user) => {
              const isModified = pendingRolesUpdates[user.id];

              const getCurrentSelect =
                pendingRolesUpdates[user.id] ?? (user.admin ? "admin" : "user");

              const isSelf = user.id === currentUser?.id;

              const userRole = getCurrentSelect;

              return (
                <tr key={user.id}>
                  <td className="px-6 py-4 font-medium whitespace-nowrap w-fit">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <img
                          className="w-full h-full rounded-full"
                          src={user.avatar_url}
                          alt={user.name}
                        />
                      </div>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-600">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 capitalize whitespace-nowrap">
                    <div>
                      {userRole === "admin" ? (
                        <div className="flex items-center gap-2">
                          <IoShieldOutline className="text-purple-600" />
                          <span className="px-3 py-1 rounded-full text-sm capitalize bg-purple-100 text-purple-700">
                            admin
                          </span>
                        </div>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm  bg-gray-200 text-gray-700">
                          user
                        </span>
                      )}
                    </div>

                    {isModified && (
                      <span className="text-[10px] font-extrabold text-orange-600 px-2 uppercase">
                        Modified
                      </span>
                    )}
                  </td>
                  <td className="p-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600">
                      {formattedDate(user.created_at)}
                    </p>
                  </td>
                  <td className="p-6 py-4 whitespace-nowrap">
                    <select
                      disabled={isSelf}
                      onChange={(e) =>
                        handleRoleChange(
                          user.id,
                          e.target.value,
                          user.admin ? "admin" : "user",
                        )
                      }
                      value={getCurrentSelect}
                      className={`${isSelf ? "bg-gray-100 cursor-not-allowed" : ""} px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                </tr>
              );
            }}
          />

          {usersDetails && !!count && count > PAGE_SIZE && (
            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          )}
        </Table>
      )}
      {lengthPendingRoles > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            disabled={isPending}
            onClick={handleUpdateUsers}
            className={`bg-secondary text-white px-8 py-3 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 ${isPending ? "opacity-70 cursor-not-allowed" : "animate-bounce"}`}
          >
            {isPending ? "Loading..." : `Save ${lengthPendingRoles} Changes`}
          </button>
        </div>
      )}
    </>
  );
}

export default TableAdminUsers;
