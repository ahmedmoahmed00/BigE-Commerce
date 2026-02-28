import { useEffect, useRef, useState } from "react";
import Modal from "../../../../shared/components/ui/Modal";
import type { CategoryDetails, CategoryPayload } from "../../types";
import Input from "../../../auth/components/Input";
import { FiUpload } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import SubmitButton from "../../../../shared/components/ui/SubmitButton";
import ShowMessageError from "../../../../shared/components/ui/ShowMessageError";
import useUpdateCategory from "../../hooks/categories/useUpdateCategory";
import useCreateCategory from "../../hooks/categories/useCreateCategory";

interface ManageProductModalProps {
  categoryToEdit: CategoryDetails;
  onClose: () => void;
}

function ManageCategoryModal({
  categoryToEdit,
  onClose,
}: ManageProductModalProps) {
  const {
    mutate: updateCategory,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateCategory();

  const {
    mutate: createCategory,
    isSuccess: isSuccessCreate,
    isPending: isPendingCreate,
  } = useCreateCategory();

  const { id: editId, image_url, name, slug } = categoryToEdit || {};

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isEditSession = Boolean(editId);
  const [messageError, setMessageError] = useState("");

  const [formData, setFormData] = useState<CategoryPayload>({
    id: editId || "",
    categoryName: name || "",
    categorySlug: slug || "",
    categoryImage: image_url || "",
    categoryFile: undefined,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;

    if (files?.[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData({
        ...formData,
        categoryFile: files[0],
        categoryImage: imageUrl,
      });
    }
  };

  useEffect(() => {
    if (isSuccessUpdate || isSuccessCreate) onClose();
  }, [isSuccessUpdate, isSuccessCreate, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.categoryName ||
      !formData.categoryImage ||
      !formData.categorySlug
    ) {
      setMessageError("All fields are required. Please fill them out.");
      return;
    }

    const categoryPayload = {
      ...formData,
      categoryName: formData.categoryName.trim(),
      categorySlug: formData.categorySlug
        .toLowerCase()
        .trim()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    };

    if (isEditSession) {
      updateCategory({
        category: categoryPayload,
      });
    } else {
      createCategory({
        category: categoryPayload,
      });
    }

    setMessageError("");
  };

  return (
    <Modal
      onClose={onClose}
      title={isEditSession ? "Edit Product" : "Add New Product"}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {messageError && <ShowMessageError messageError={messageError} />}
        <Input
          value={formData.categoryName}
          label="Category Name"
          setValue={(val) => setFormData({ ...formData, categoryName: val })}
          showIcon={false}
          placeholder="Enter product name"
        />

        <Input
          value={formData.categorySlug}
          label="Slug"
          setValue={(val) =>
            setFormData({
              ...formData,
              categorySlug: val
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, ""),
            })
          }
          showIcon={false}
          placeholder="e.g., electronics"
        />

        <div className="h-40 w-full mt-2">
          {!formData.categoryImage ? (
            <div
              onClick={() => inputRef.current?.click()}
              className="h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-secondary cursor-pointer transition-colors text-gray-500"
            >
              <FiUpload className="size-8" />
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs">PNG, JPG up to 10MB</p>
              </div>
              <input
                onChange={handleFileChange}
                type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*"
              />
            </div>
          ) : (
            <div className="relative h-full w-full rounded-lg overflow-hidden border border-gray-200">
              <img
                className="h-full w-full object-contain bg-gray-50"
                src={formData.categoryImage}
                alt="Product Preview"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    categoryFile: undefined,
                    categoryImage: "",
                  })
                }
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-md"
              >
                <IoCloseOutline className="size-5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg border border-gray-300 transition-colors"
          >
            Cancel
          </button>
          <div className="flex-1">
            <SubmitButton
              disabled={isEditSession ? isPendingUpdate : isPendingCreate}
            >
              {isPendingCreate || isPendingUpdate ? (
                <div className="flex items-center justify-center">
                  <div className="loader size-6 bg-primary"></div>
                </div>
              ) : isEditSession ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ManageCategoryModal;
