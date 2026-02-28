import { LuSquarePen } from "react-icons/lu";
import { Table } from "../shared/Tabel";
import { FaRegTrashCan } from "react-icons/fa6";
import Pagination from "../shared/Pagination";
import Spinner from "../../../../shared/components/ui/Spinner";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import ManageProductModal from "./ManageProductModal";
import { useState } from "react";
import type { ProductDetails } from "../../types";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";
import useProductsDetails from "../../hooks/products/useProductsDetails";

function TabelAdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<ProductDetails>();

  const { isLoading, productsDetails, count } = useProductsDetails();
  const { isPending, mutate: deleteProduct } = useDeleteProduct();
  const handelEditProduct = (product: ProductDetails) => {
    setIsModalOpen(true);
    setProductToEdit(product);
  };

  const handelDeleteProduct = (productId: string | number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (isConfirmed) {
      deleteProduct({ productId });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && productsDetails && (
        <Table>
          <Table.Header>
            <Table.Heading>Product</Table.Heading>
            <Table.Heading>Category</Table.Heading>
            <Table.Heading>Price</Table.Heading>
            <Table.Heading>Stock</Table.Heading>
            <Table.Heading>Actions</Table.Heading>
          </Table.Header>
          <Table.Body
            data={productsDetails}
            render={(product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 font-medium whitespace-nowrap w-fit">
                  <div className="flex items-center gap-3 max-w-md w-full">
                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{product.name}</div>
                      <p className="text-sm text-gray-500 truncate">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 capitalize py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-100 text-secondary rounded text-sm">
                    {product.category?.name || "No Category"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 px-2 py-1 border rounded focus:outline-none border-gray-200 font-medium">
                    {product.price}
                  </div>
                </td>
                <td className="p-6 py-4 whitespace-nowrap">
                  <div className="w-20 px-2 py-1 border border-gray-200 rounded focus:outline-none">
                    {product.stock_quantity}
                  </div>
                </td>
                <td className="p-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handelEditProduct(product)}
                      aria-label="Edit Product"
                      className="p-2 cursor-pointer text-secondary hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <LuSquarePen className="size-4" />
                    </button>
                    <button
                      disabled={isPending}
                      onClick={() => handelDeleteProduct(product.id)}
                      aria-label="Delete Product"
                      className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaRegTrashCan className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />

          {productsDetails && !!count && count > PAGE_SIZE && (
            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          )}
        </Table>
      )}
      {isModalOpen && productToEdit && (
        <ManageProductModal
          productToEdit={productToEdit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default TabelAdminProducts;
