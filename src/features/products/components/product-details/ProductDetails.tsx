import { FaStar } from "react-icons/fa6";
import { formatCurrency } from "../../../../shared/utils/helpers";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineLocalShipping, MdOutlineShield } from "react-icons/md";
import type { Product } from "../../types";
import { useCart } from "../../../cart/hooks/useCart";

const features = [
  {
    icon: <MdOutlineShield className="text-secondary size-8" />,
    title: "Quality Guarantee",
    description: "30-day money-back guarantee on all products",
  },
  {
    icon: <MdOutlineLocalShipping className="text-secondary size-8" />,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
  },
  {
    icon: <FiShoppingCart className="text-secondary size-8" />,
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days",
  },
];

function ProductDetails({ product }: { product: Product | null }) {
  const { addItemToCart } = useCart();
  const isOutOfStock = product?.stock_quantity === 0;
  const isInStock = product?.stock_quantity && product.stock_quantity > 10;

  const AddItemtoCart = () => {
    if (!isOutOfStock && product) {
      addItemToCart({ ...product, quantityInCart: 1 });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      <div className=" rounded-xl overflow-hidden bg-gray-100">
        <img
          className="w-full "
          src={product?.image_url}
          alt={product?.name || "Product image"}
        />
      </div>
      <div>
        <div>
          <div className="inline-block px-3 mb-4 py-1.5 bg-blue-100 text-secondary rounded-full  w-fit">
            <span>tags</span>
          </div>
          <div className="mb-4 ">
            <h1 className="text-xl font-semibold">{product?.name}</h1>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-6">
            <div className="flex items-center  gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={`${"text-yellow-400 size-6"}`} />
              ))}
            </div>
            <div className=" space-x-2">
              <span className="font-medium">4.6</span>
              <span className="text-gray-500">(178 reviews)</span>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 mb-6">{product?.description}</p>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-semibold">
              {formatCurrency(product?.price || 0)}
            </span>
          </div>
          <div>
            {isOutOfStock ? (
              <span className="text-red-600 font-medium">Out of Stock</span>
            ) : (
              <div>
                <span>
                  <FiShoppingCart
                    className={`${isOutOfStock ? "text-red-600" : "text-green-600"} inline text-xl mr-2`}
                  />
                </span>
                {isInStock ? (
                  <span className="text-green-600">
                    In Stock ({product.stock_quantity} Available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Only {product?.stock_quantity} Left in Stock
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="mb-8">
            <button
              onClick={AddItemtoCart}
              disabled={isOutOfStock}
              className={`flex items-center justify-center gap-2 mt-6 px-6 py-3 w-full rounded-lg text-primary  transition-colors ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            >
              <span>
                <FiShoppingCart className="inline mr-2 text-xl" />
              </span>
              <span> Add to Cart</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index + feature.title}
              className="flex items-center gap-3"
            >
              <div>{feature.icon}</div>
              <div>
                <h3 className="font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
