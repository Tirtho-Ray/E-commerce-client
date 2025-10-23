import { useLocation, useNavigate } from "react-router";
import { useProduct } from "../../hooks/queries/useProduct";
import PCard from "../../components/ui/productCard/PCard";
import ProductCardSkeleton from "../../components/ui/productCard/ProductCardSkeleton";
import ProductFilter from "./ProductFilter";
import SortSelect from "./SortSelect";
import { useState } from "react";
import type { TProduct } from "../../types/product/product";

const Product = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";
    const navigate = useNavigate();

    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

    const { data, isLoading, isError } = useProduct(searchQuery);

    return (
        <div>
            {/* <h1 className="text-lg font-semibold mb-3 mt-4">Products</h1> */}
            <div className="flex flex-row-reverse md:flex-row gap-4 mt-4">
                {/* Filter Section */}
                <div className="hidden md:block w-1/5 p-2">
                    <p>Filter Product</p>
                    <ProductFilter />
                </div>

                {/* Product Section */}
                <div className="flex-1">
                    <div className="flex justify-end">
                        <SortSelect value={sortOrder} onChange={setSortOrder} />
                    </div>

                    {/* Error message */}
                    {isError && (
                        <p className="text-center text-red-500 mt-4">
                            Failed to load products.
                        </p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, idx) => (
                                <ProductCardSkeleton key={idx} />
                            ))
                        ) : data?.data && data.data.length > 0 ? (
                            data.data.map((product: TProduct) => (
                                <PCard
                                    key={product.productId}
                                    id={product._id}
                                    name={product.item.name}
                                    image={product.item.picture}
                                    price={product.item.price}
                                    brand={product.item.brand}
                                    discountPricePercent={product.discount}
                                    discount={product.discount?.amount}
                                    onQuickView={(id) => navigate(`/products/${id}`)}
                                />
                            ))
                        ) : (
                            // ✅ Show “No products found”
                            <p className="col-span-full text-center text-gray-500 mt-6">
                                No products found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
