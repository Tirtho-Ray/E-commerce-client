import { useLocation, useNavigate } from "react-router";
import { useProduct } from "../../hooks/queries/useProduct";
import PCard from "../../components/ui/productCard/PCard";
import ProductCardSkeleton from "../../components/ui/productCard/ProductCardSkeleton";
import ProductFilter from "./ProductFilter";
import SortSelect from "./SortSelect";
import { useState } from "react";
import { processProducts } from "../../utils/productHelper/productUtils";

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const searchQuery = queryParams.get("search") || "";
    const categoryQuery = queryParams.get("category") || "all";

    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");
    const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [minRating, setMinRating] = useState<number | null>(null);

    const { data, isLoading, isError } = useProduct(searchQuery);

    // Convert price input to numbers
    //   const priceObj = {
    //     min: priceRange.min ? parseFloat(priceRange.min) : undefined,
    //     max: priceRange.max ? parseFloat(priceRange.max) : undefined,
    //   };

    const filteredProducts = processProducts(
        data?.data || [],
        searchQuery,
        selectedCategory,
        sortOrder,
    );

    // Sync URL with category
    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        queryParams.set("category", cat);
        navigate(`/products?${queryParams.toString()}`);
    };

    return (
        <div className="flex flex-row-reverse md:flex-row gap-4 mt-4">
            {/* Filter */}
            <div className="hidden md:block w-1/5 p-2">
                <ProductFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    minRating={minRating}
                    onRatingChange={setMinRating}
                />
            </div>

            {/* Products */}
            <div className="flex-1">
                <div className="flex justify-end">
                    <SortSelect value={sortOrder} onChange={setSortOrder} />
                </div>

                {isError && <p className="text-center text-red-500 mt-4">Failed to load products.</p>}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, idx) => <ProductCardSkeleton key={idx} />)
                        : filteredProducts.length > 0
                            ? filteredProducts.map(product => (
                                <PCard
                                    key={product.productId}
                                    id={product._id}
                                    name={product.item.name}
                                    image={product.item.picture}
                                    price={product.item.price}
                                    brand={product.item.brand}
                                    discountPricePercent={product.discount}
                                    discount={product.discount?.amount}
                                    onQuickView={id => navigate(`/products/${id}`)}
                                />
                            ))
                            : <p className="col-span-full text-center text-gray-500 mt-6">No products found.</p>}
                </div>
            </div>
        </div>
    );
};

export default Product;
