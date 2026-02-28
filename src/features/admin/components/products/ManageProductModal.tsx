import { useEffect, useRef, useState } from "react";
import Modal from "../../../../shared/components/ui/Modal";
import type { Option, ProductDetails, UpdateProductPayload } from "../../types";
import Input from "../../../auth/components/Input";
import { FiUpload } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import SubmitButton from "../../../../shared/components/ui/SubmitButton";
import useGetCategories from "../../../categories/hooks/useGetCategories";
import type { Category } from "../../../categories/types";
import { CustomSelect } from "../../../../shared/components/ui/CustomSelect";
import ShowMessageError from "../../../../shared/components/ui/ShowMessageError";
import useCreateProduct from "../../hooks/products/useCreateProduct";
import useUpdateProduct from "../../hooks/products/useUpdateProduct";

interface ManageProductModalProps {
  productToEdit: ProductDetails;
  onClose: () => void;
}

function ManageProductModal({
  productToEdit,
  onClose,
}: ManageProductModalProps) {
  const { data: categoriesList, isLoading } = useGetCategories({
    paginate: false,
  });

  const {
    mutate: updateProduct,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useUpdateProduct();
  const {
    mutate: createProduct,
    isSuccess: isSuccessCreate,
    isPending: isPendingCreate,
  } = useCreateProduct();

  const {
    id: editId,
    category = { id: "", name: "", slug: "" },
    description,
    image_url,
    name,
    price,
    stock_quantity,
  } = productToEdit || {};

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isEditSession = Boolean(editId);
  const [messageError, setMessageError] = useState("");

  const [formData, setFormData] = useState<UpdateProductPayload>({
    id: editId || "",
    productName: name || "",
    description: description || "",
    price: price || 0,
    stock: stock_quantity || 0,
    categoryId: category.id || "",
    categorySlug: category?.slug || "",
    productImage: image_url || "",
    productFile: undefined,
  });

  const categoriesOptions =
    categoriesList?.map((cat: Category) => ({
      id: cat.id,
      value: cat.slug,
      label: cat.name,
    })) || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;

    if (files?.[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData({
        ...formData,
        productFile: files[0],
        productImage: imageUrl,
      });
    }
  };

  useEffect(() => {
    if (isSuccessUpdate || isSuccessCreate) onClose();
  }, [isSuccessUpdate, isSuccessCreate, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.productImage ||
      !formData.productName ||
      !formData.categoryId ||
      !formData.description ||
      formData.price === undefined ||
      formData.price === null ||
      formData.stock === undefined ||
      formData.stock === null
    ) {
      setMessageError("All fields are required. Please fill them out.");
      return;
    }

    if (Number(formData.price) < 0 || Number(formData.stock) < 0) {
      setMessageError("Price and Stock cannot be negative numbers.");
      return;
    }

    const productPayload = {
      ...formData,
      productName: formData.productName.trim(),
      description: formData.description.trim(),
    };

    if (isEditSession) {
      updateProduct({
        product: productPayload,
      });
    } else {
      createProduct({
        product: productPayload,
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
          value={formData.productName}
          label="Product Name"
          setValue={(val) => setFormData({ ...formData, productName: val })}
          showIcon={false}
          placeholder="Enter product name"
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2 text-accent"
          >
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full h-24 px-4 py-2.5 border resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            id="description"
            placeholder="Product description..."
          />
        </div>

        <div className="flex items-center gap-4">
          <Input
            value={formData.price}
            label="Price"
            type="number"
            setValue={(val) =>
              setFormData({ ...formData, price: Number(val) >= 0 ? val : 0 })
            }
            showIcon={false}
            placeholder="0.00"
          />
          <Input
            value={formData.stock}
            label="Stock"
            type="number"
            setValue={(val) =>
              setFormData({ ...formData, stock: Number(val) ? val : 0 })
            }
            showIcon={false}
            placeholder="0"
          />
        </div>

        <div className="w-full">
          {isLoading && (
            <p className="text-2xl text-gray-500 mt-1">Loading categories...</p>
          )}
          {!isLoading && categoriesOptions && (
            <CustomSelect
              label="Category"
              options={categoriesOptions}
              value={formData.categorySlug}
              onChange={(option: Option) =>
                setFormData({
                  ...formData,
                  categoryId: option.id,
                  categorySlug: option.value.toString(),
                })
              }
            />
          )}
        </div>

        <div className="h-40 w-full mt-2">
          {!formData.productImage ? (
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
                src={formData.productImage}
                alt="Product Preview"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, productImage: "" })}
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
                "Update Product"
              ) : (
                "Create Product"
              )}
            </SubmitButton>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ManageProductModal;
