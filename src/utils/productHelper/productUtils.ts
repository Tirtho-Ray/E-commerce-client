import type { TProduct } from "../../types/product/product";

export const filterProducts = (
  products: TProduct[],
  searchQuery?: string,
  category?: string
): TProduct[] => {
  let result = [...products];

  // Search filter
  if (searchQuery) {
    result = result.filter(product =>
      product.item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Category filter
if (category && category !== "all") {
  result = result.filter(product => {
    const catName = product.item.category?.name || ""; 
    return catName.toLowerCase() === category.toLowerCase();
  });
}

  return result;
};

export const sortProducts = (
  products: TProduct[],
  order: "asc" | "desc" | ""
): TProduct[] => {
  if (!order) return products;
  return [...products].sort((a, b) =>
    order === "asc" ? a.item.price - b.item.price : b.item.price - a.item.price
  );
};

export const processProducts = (
  products: TProduct[] = [],
  searchQuery?: string,
  category?: string,
  sortOrder: "asc" | "desc" | "" = ""
): TProduct[] => {
  let result = filterProducts(products, searchQuery, category);
  result = sortProducts(result, sortOrder);
  return result;
};
