import { FaPlus } from "react-icons/fa6";
import TabelAdminProducts from "../../features/admin/components/products/TabelAdminProducts";
import InputSearch from "../../features/admin/components/shared/InputSearch";
import { useState } from "react";
import ManageProductModal from "../../features/admin/components/products/ManageProductModal";
import type { ProductDetails } from "../../features/admin/types";

function AdminProducts() {
  const [showModal, setShowModel] = useState<boolean>(false);

  return (
    <div>
      <header className="flex flex-col lg:flex-row gap-2 items-center justify-between ">
        <h2 className="font-semibold mr-auto">Products Management</h2>
        <button
          onClick={() => setShowModel(true)}
          className="flex items-center justify-center w-full lg:w-fit gap-2 cursor-pointer bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus />
          Add Product
        </button>
      </header>
      <main className="mt-6 space-y-6">
        <div>
          <InputSearch />
        </div>
        <div>
          <TabelAdminProducts />
        </div>
        {showModal && (
          <ManageProductModal
            onClose={() => setShowModel(false)}
            productToEdit={{} as ProductDetails}
          />
        )}
      </main>
    </div>
  );
}

export default AdminProducts;
