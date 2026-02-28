import { useEffect, useState } from "react";
import { supabase } from "../services/supabase.js";

export interface Root2 {
  slug: string;
  name: string;
  url?: string;
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  const data = await res.json();

  return data;
}

async function getProducts(productslug: string) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${productslug}`,
  );
  const data = await res.json();

  return data.products;
}

async function insertCategory(category: Root2) {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name: category.name, slug: category.slug }])
      .select();

    if (error) {
      throw error;
    }

    return data[0].id;
  } catch (error) {
    console.error("Error inserting category:", error);
  }

  return;
}

async function insertProduct(product: ProductType, categoryId: number) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name: product.title,
          description: product.description,
          price: product.price,
          stock_quantity: product.stock,
          image_url: product.thumbnail,
          category_id: categoryId,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error inserting product:", error);
  }
}

async function uploadData({ categories }: { categories: Root2[] }) {
  categories.forEach(async (category: Root2) => {
    const categoryId = await insertCategory(category);
    const products = await getProducts(category.slug);

    products.forEach(async (product: ProductType) => {
      await insertProduct(product, categoryId);
    });
  });
}

function Uploader() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div>
      <button
        className="p-4 text-white font-semibold bg-green-600 rounded-lg fixed z-auto  bottom-4 right-4"
        onClick={() => uploadData({ categories })}
      >
        Upload
      </button>
    </div>
  );
}

export default Uploader;
