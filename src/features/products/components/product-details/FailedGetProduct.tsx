import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

function FailedGetProduct() {
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
        <div className="text-red-600 font-medium">
          Failed to load product details. Please try again later.
        </div>
      </div>
    </div>
  );
}

export default FailedGetProduct;
