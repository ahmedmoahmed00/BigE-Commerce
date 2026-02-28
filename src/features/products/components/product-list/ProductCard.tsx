import { formatCurrency } from "../../../../shared/utils/helpers";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { memo } from "react";
import { useCart } from "../../../cart/hooks/useCart";

type ProductCardProps = {
  isGrid: boolean;
  product: Product;
};

function ProductCard({ isGrid, product }: ProductCardProps) {
  const { addItemToCart } = useCart();

  const isOutOfStock = product?.stock_quantity === 0;

  const AddItemtoCart = () => {
    if (!isOutOfStock && product) {
      addItemToCart({ ...product, quantityInCart: 1 });
    }
  };

  return (
    <div
      className={`${
        isGrid ? "" : "flex"
      } bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
    >
      <Link
        className={`${!isGrid ? "w-48 block" : ""}`}
        to={`/products/${product.id}`}
      >
        <div
          className={`${isGrid ? "aspect-square" : "h-full"} overflow-hidden`}
        >
          <img
            loading="lazy"
            src={product.image_url}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            alt={product.description}
          />
        </div>
      </Link>

      <div className={`${!isGrid ? "flex-1" : ""} p-4`}>
        <Link to={`/products/${product.id}`}>
          <div className="font-medium mb-2 text-gray-900 hover:text-secondary transition-colors">
            <h3>{product.name}</h3>
          </div>
        </Link>

        <div className="text-sm text-gray-700 mb-3 line-clamp-2">
          <p>{product.description}</p>
        </div>

        <div
          className={`${
            !isGrid ? "flex-col lg:flex-row" : ""
          } flex lg:items-center gap-2 lg:gap-0 justify-between`}
        >
          <span className="font-semibold text-xl text-gray-900">
            {formatCurrency(Math.round(product.price), 0)}
          </span>

          {!isOutOfStock && (
            <button
              onClick={AddItemtoCart}
              className="flex items-center gap-2 cursor-pointer bg-secondary text-white px-4 py-2 rounded-lg hover:brightness-90 transition-all"
            >
              <FiShoppingCart />
              <span className="text-sm font-semibold">Add</span>
            </button>
          )}
        </div>

        <div className="mt-2 text-sm">
          <span
            className={`${
              product.stock_quantity > 10 ? "text-green-800" : "text-red-700"
            }`}
          >
            In Stock ({product.stock_quantity})
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
