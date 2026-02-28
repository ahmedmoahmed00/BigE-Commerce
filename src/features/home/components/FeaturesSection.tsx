import {
  FiHeadphones,
  FiLock,
  FiRefreshCcw,
  FiShoppingBag,
} from "react-icons/fi";
import FeatureBox from "./FeatureBox";

const features = [
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over $50",
    icon: FiShoppingBag,
  },
  {
    title: "24/7 Support",
    description: "Our support team is here to help you anytime",
    icon: FiHeadphones,
  },
  {
    title: "Secure Payment",
    description: "We ensure secure payment with SSL encryption",
    icon: FiLock,
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days",
    icon: FiRefreshCcw,
  },
];

function FeaturesSection() {
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureBox
              delay={index === 0 ? 0 : index * 100}
              key={index}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
