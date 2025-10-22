import { useLocation, useNavigate } from "react-router";
import { useProduct } from "../../hooks/queries/useProduct";
import PCard from "../../components/ui/productCard/PCard";
import type { TProduct } from "../../types/product/product";
import ProductFilter from "./ProductFilter";
import ProductCardSkeleton from "../../components/ui/productCard/ProductCardSkeleton";
import SortSelect from "./SortSelect";
import { useState } from "react";

const Product = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    const navigate = useNavigate();

    const { data, isLoading } = useProduct();

    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

    // console.log(data)
    // const filteredProducts = (data?.data || []).filter((product: TProduct) =>
    //     product.item.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    // );

    return (
        <div>
            <h1 className="text-lg font-semibold mb-3">Product</h1>
            <div className="flex flex-row-reverse md:flex-row gap-4">
                {/* filter section */}
                <div className="w-1/5 p-2">
                    <p>Filter Product</p>
                    <ProductFilter />
                </div>

                {/* Product section */}
                <div>
                    <div className="flex justify-end">
                        <SortSelect value={sortOrder} onChange={setSortOrder} />
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-3 lg:gap-x-4 md:mt-6 ">
                        {isLoading
                            ? Array.from({ length: 8 }).map((_, idx) => (
                                <ProductCardSkeleton key={idx} />
                            ))
                            : (data?.data || []).map((product: TProduct) => (
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
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
