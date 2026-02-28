import { Link } from "react-router-dom";
import useInView from "../../../shared/hooks/useInView";
import type { Category } from "../../categories/types";
import type { ReactNode } from "react";

function CategoryBox({
  category,
  delay,
  children,
}: {
  category: Category;
  delay?: number;
  children: ReactNode;
}) {
  const { ref, visible } = useInView({ threshold: 0.2 });

  const getOptimizedImage = (url: string, width = 400) => {
    if (!url) return "";
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?w=${width}&q=85&fm=webp&fit=crop`;
  };

  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      ref={ref}
      className={`${visible ? " translate-y-0 opacity-100 " : " translate-y-5 opacity-0 "} transition-all duration-600 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg bg-white`}
    >
      <Link to={`/products?category=${category.slug}`}>
        <div className="aspect-square overflow-hidden">
          <img
            loading="lazy"
            src={getOptimizedImage(category.image_url, 200)}
            srcSet={`${getOptimizedImage(category.image_url, 400)} 1x, ${getOptimizedImage(category.image_url, 800)} 2x`}
            alt={`Shop our ${category.name} collection`}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 font-semibold text-center">{children}</div>
      </Link>
    </div>
  );
}

export default CategoryBox;
