import { Link, useParams } from "react-router-dom";
import useGetProductById from "../features/products/hooks/useGetProductById";
import { BiArrowBack } from "react-icons/bi";
import ProductDetailsSkeleton from "../features/products/components/product-details/ProductDetailsSkeleton";
import FailedGetProduct from "../features/products/components/product-details/FailedGetProduct";
import ProductDetails from "../features/products/components/product-details/ProductDetails";

function ProductDetailsPage() {
  const productId = useParams().productId as string;

  const { data: product, isLoading, error } = useGetProductById({ productId });

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product || error) {
    return <FailedGetProduct />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="flex gap-2 items-center">
          <span className="text-xl">
            <BiArrowBack />
          </span>
          <span>Back</span>
        </Link>
      </div>
      <div className="p-8 bg-primary rounded-2xl overflow-hidden shadow-sm">
        <ProductDetails product={product} />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
