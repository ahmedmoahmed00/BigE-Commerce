import FilterProducts from "../features/products/components/product-list/FilterProducts";
import ProductsSection from "../features/products/components/product-list/ProductsSection";

function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8 lg:flex-row relative">
        <div className="bg-primary p-6 lg:sticky top-24 h-fit">
          <FilterProducts />
        </div>
        <div className="flex-1">
          <ProductsSection />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
