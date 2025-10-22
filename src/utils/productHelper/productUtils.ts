import type { TProduct } from "../../types/product/product";


export const filterProducts = (products: TProduct[], searchQuery?: string): TProduct[] => {
    if (!searchQuery) return products;
    return products.filter((product) =>
        product.item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
};


export const sortProducts = (products: TProduct[], order: "asc" | "desc" | ""): TProduct[] => {
    if (!order) return products;
    const sorted = [...products];
    return sorted.sort((a, b) =>
        order === "asc"
            ? a.item.price - b.item.price
            : b.item.price - a.item.price
    );
};


export const processProducts = (
    products: TProduct[] = [],
    searchQuery?: string,
    sortOrder: "asc" | "desc" | "" = ""
): TProduct[] => {
    let result = filterProducts(products, searchQuery);
    result = sortProducts(result, sortOrder);
    return result;
};
