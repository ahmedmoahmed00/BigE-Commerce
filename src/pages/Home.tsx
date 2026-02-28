import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import useInView from "../shared/hooks/useInView";
import FeaturesSection from "../features/home/components/FeaturesSection";
import CategoriesSection from "../features/home/components/CategoriesSection";

function Home() {
  const { ref, visible } = useInView();

  return (
    <div className="relative">
      <div className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <div ref={ref}>
            <div>
              <h1
                className={`${visible ? "translate-y-0 opacity-100" : " translate-y-5 opacity-0"} transition-all duration-400`}
              >
                Welcome to ShopHub!
              </h1>
              <p
                className={`${visible ? "translate-y-0 opacity-100" : " translate-y-5 opacity-0"} transition-all duration-700 mt-4 mb-8 text-xl`}
              >
                Discover amazing products at unbeatable prices. Your
                satisfaction is our priority.
              </p>
            </div>
            <Link
              className={`${visible ? "translate-y-0 opacity-100" : " translate-y-5 opacity-0"} duration-800 py-3 flex items-center hover:bg-gray-100 gap-2 w-fit mx-auto font-semibold px-8 rounded-lg bg-primary text-secondary`}
              to="/products"
            >
              <span>Shop Now</span>
              <span className="text-xl">
                <FiShoppingBag />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container bg-secondarybackground mx-auto px-4 py-16">
        <CategoriesSection />
      </div>
      <div>
        <FeaturesSection />
      </div>
    </div>
  );
}

export default Home;
