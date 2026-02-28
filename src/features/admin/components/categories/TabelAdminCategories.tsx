import { useState } from "react";
import Spinner from "../../../../shared/components/ui/Spinner";
import { FaRegTrashCan } from "react-icons/fa6";
import { Table } from "../shared/Tabel";
import Pagination from "../shared/Pagination";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import type { CategoryDetails } from "../../types";
import useCategoriesDetails from "../../hooks/categories/useCategoriesDetails";
import { LuPackage, LuSquarePen } from "react-icons/lu";
import ManageCategoryModal from "./ManageCategoryModal";
import useDeleteCategory from "../../hooks/categories/useDeleteCategory";

function TabelAdminCategories() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryDetails>();

  const { isLoading, categoriesDetails, count } = useCategoriesDetails();

  const { isPending, mutate: deleteCategory } = useDeleteCategory();

  const handelEditCategory = (category: CategoryDetails) => {
    setIsModalOpen(true);
    setCategoryToEdit(category);
  };

  const handelDeleteCategory = (categoryId: string | number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Category?",
    );

    if (isConfirmed) {
      deleteCategory({ categoryId });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && categoriesDetails && (
        <Table>
          <Table.Header>
            <Table.Heading>Image</Table.Heading>
            <Table.Heading>Category Name</Table.Heading>
            <Table.Heading>Slug</Table.Heading>
            <Table.Heading>Products</Table.Heading>
            <Table.Heading>Actions</Table.Heading>
          </Table.Header>
          <Table.Body
            data={categoriesDetails}
            render={(category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 font-medium whitespace-nowrap w-fit">
                  <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 capitalize py-4 whitespace-nowrap">
                  <span className="px-2 py-1 font-medium">{category.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className=" text-slate-600">{category.slug}</div>
                </td>
                <td className="p-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-secondary rounded-full font-medium">
                    <LuPackage />
                    {category.products[0].count}
                  </span>
                </td>
                <td className="p-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handelEditCategory(category)}
                      aria-label="Edit Product"
                      className="p-2 cursor-pointer text-secondary hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <LuSquarePen className="size-4" />
                    </button>
                    <button
                      disabled={isPending}
                      onClick={() => handelDeleteCategory(category.id)}
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

          {categoriesDetails && !!count && count > PAGE_SIZE && (
            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          )}
        </Table>
      )}
      {isModalOpen && categoryToEdit && (
        <ManageCategoryModal
          categoryToEdit={categoryToEdit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default TabelAdminCategories;
