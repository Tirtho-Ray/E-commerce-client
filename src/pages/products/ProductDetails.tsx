/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { useProductDetails } from "../../hooks/queries/useProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaHeart, FaShoppingCart, FaTruck, FaStar } from "react-icons/fa";

// ✅ Types
interface VariantSize {
    size: string;
    stock: number;
    additionalPrice?: number;
    sku?: string;
}

interface Variant {
    color: string;
    variantPictures?: string[];
    sizes: VariantSize[];
}

interface ProductItem {
    name: string;
    description?: string;
    price: number;
    quantity?: number;
    picture?: string;
    manyPictures?: string[];
    brand?: string;
    variants?: Variant[];
    tags?: string[];
}

interface Discount {
    type?: "percentage" | "fixed";
    amount?: number;
    isActive?: boolean;
    startDate?: string | null;
    endDate?: string | null;
}

interface Shipping {
    isFree?: boolean;
    deliveryCharge?: number;
    estimatedDays?: number;
}

interface Reviews {
    averageRating?: number;
    totalReviews?: number;
}

interface ProductData {
    item: ProductItem;
    discount?: Discount;
    shipping?: Shipping;
    reviews?: Reviews;
    _id?: string;
}

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error } = useProductDetails(id!);
    const product: ProductData | undefined = data?.data || data;

    // UI states
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    //  Build images array
    const images = useMemo(() => {
        if (!product) return [];
        const main = product.item.picture ? [product.item.picture] : [];
        const many = product.item.manyPictures || [];
        const variants = product.item.variants?.flatMap(v => v.variantPictures || []) || [];
        return Array.from(new Set([...main, ...many, ...variants]));
    }, [product]);

    // Current variant and size
    const selectedVariant = useMemo<Variant | null>(() => {
        return product?.item?.variants?.[selectedColorIndex] || null;
    }, [product, selectedColorIndex]);

    const priceBase = product?.item?.price ?? 0;

    const additionalPrice = useMemo(() => {
        if (!selectedVariant || selectedSizeIndex === null) return 0;
        return selectedVariant.sizes[selectedSizeIndex]?.additionalPrice ?? 0;
    }, [selectedVariant, selectedSizeIndex]);

    //  Final price with discount
    const finalPrice = useMemo(() => {
        let price = priceBase + additionalPrice;
        const disc = product?.discount;
        if (disc?.isActive && disc.amount) {
            if (disc.type === "percentage") {
                price -= price * (disc.amount / 100);
            } else {
                price = Math.max(0, price - disc.amount);
            }
        }
        return Number(price.toFixed(2));
    }, [priceBase, additionalPrice, product]);

    //  Quantity helpers
    const increment = () => setQuantity(q => Math.min(q + 1, 99));
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    //  Loading state
    if (isLoading)
        return (
            <div className="container mx-auto p-4 animate-pulse">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-96 bg-gray-200 rounded-xl" />
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 w-3/5 rounded" />
                        <div className="h-6 bg-gray-200 w-2/5 rounded" />
                        <div className="h-40 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );

    //  Error
    if (isError)
        return (
            <div className="container mx-auto p-6 text-red-600">
                Error loading product: {(error as any)?.message || "Unknown error"}
            </div>
        );

    if (!product) return <div className="p-6 text-gray-600">No product found.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* ===== LEFT: IMAGES ===== */}
                <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-md">
                        <Swiper
                            modules={[Navigation, Thumbs]}
                            thumbs={{ swiper: thumbsSwiper }}
                            navigation={{ nextEl: ".pd-next", prevEl: ".pd-prev" }}
                            spaceBetween={10}
                            className="h-[220px] md:h-[420px]"
                        >
                            {images.length ? (
                                images.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <img
                                            src={img}
                                            alt={`Product ${i}`}
                                            className="w-full h-[240px] md:h-[320px] lg:h-[420px] object-contain p-6 transition-transform duration-300 hover:scale-105"
                                        />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <SwiperSlide>
                                    <div className="flex items-center justify-center h-[60px] text-gray-400">
                                        No Image
                                    </div>
                                </SwiperSlide>
                            )}
                            <button className="pd-prev absolute left-3 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100 z-10">
                                ‹
                            </button>
                            <button className="pd-next absolute right-3 top-1/2 -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100 z-10">
                                ›
                            </button>
                        </Swiper>

                        {images.length > 1 && (
                            <div className="mt-3">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={8}
                                    slidesPerView={5}
                                    className="h-20"
                                >
                                    {images.map((img, i) => (
                                        <SwiperSlide key={i} className="cursor-pointer">
                                            <img
                                                src={img}
                                                alt={`thumb-${i}`}
                                                className="h-20 w-full object-cover rounded-lg border hover:border-blue-500 transition"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>
                </div>

                {/* ===== RIGHT: INFO ===== */}
                <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">{product.item.name}</h1>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                    <FaStar className="text-yellow-400" />
                                    {product.reviews?.averageRating ?? 0} ({product.reviews?.totalReviews ?? 0})
                                </span>

                                <span className="flex items-center gap-1">
                                    <FaTruck /> {product.shipping?.estimatedDays ?? "--"} days
                                </span>
                            </div>
                            <div>
                                Brand: <span className="font-medium">{product.item.brand}</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-2xl lg:text-3xl font-bold text-blue-600">${finalPrice}</div>
                            {product.discount?.isActive && (
                                <div className="text-sm bg-red-500 text-white px-3 py-1 rounded inline-block mt-1">
                                    {product.discount.type === "percentage"
                                        ? `${product.discount.amount}% OFF`
                                        : `-$${product.discount.amount}`}
                                </div>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                                {product.shipping?.isFree
                                    ? "Free shipping"
                                    : `Shipping: $${product.shipping?.deliveryCharge ?? 0}`}
                            </div>
                        </div>
                    </div>



                    {/* Colors */}
                    {product.item.variants && (
                        <div>
                            <div className="font-semibold mb-2">Color</div>
                            <div className="flex flex-wrap gap-2">
                                {product.item.variants.map((v, i) => (
                                    <button
                                        key={v.color + i}
                                        onClick={() => {
                                            setSelectedColorIndex(i);
                                            setSelectedSizeIndex(null);
                                        }}
                                        className={`px-3 py-1 rounded-full border transition ${selectedColorIndex === i
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-400"
                                            }`}
                                    >
                                        {v.color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {selectedVariant && (
                        <div>
                            <div className="font-semibold mb-2">Size</div>
                            <div className="flex flex-wrap gap-2">
                                {selectedVariant.sizes.map((s, i) => (
                                    <button
                                        key={s.size + i}
                                        onClick={() => setSelectedSizeIndex(i)}
                                        className={`px-3 py-1 rounded-lg border transition ${selectedSizeIndex === i
                                            ? "border-blue-600 bg-blue-50"
                                            : "border-gray-200 hover:border-gray-400"
                                            }`}
                                    >
                                        {s.size} {s.additionalPrice ? `+${s.additionalPrice}$` : ""}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                        <div className="font-semibold">Quantity</div>
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <button onClick={decrement} className="px-3 py-2 hover:bg-gray-100">
                                -
                            </button>
                            <div className="px-4">{quantity}</div>
                            <button onClick={increment} className="px-3 py-2 hover:bg-gray-100">
                                +
                            </button>
                        </div>
                        <span className="text-sm text-gray-500">
                            Stock: {selectedVariant?.sizes[selectedSizeIndex ?? 0]?.stock ??
                                product.item.quantity ??
                                0}
                        </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow">
                            <FaShoppingCart /> Add to Cart
                        </button>
                        <button className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                            <FaHeart /> Wishlist
                        </button>
                        {/* <button className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                            <FaShareAlt /> Share
                        </button> */}
                    </div>

                    <p className="text-gray-700 leading-relaxed text-justify text-[10px]  md:text-[15px]">
                        {product.item.description}
                    </p>

                    {/* Meta Info */}
                    <div className="text-sm text-gray-600 mt-4 space-y-1">

                        <div>
                            Product ID:{" "}
                            <span className="font-medium">{product._id ?? "—"}</span>
                        </div>
                        {product.item.tags && (
                            <div>
                                Tags:{" "}
                                <span className="font-medium">
                                    {product.item.tags.join(", ")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== MOBILE STICKY BOTTOM BAR ===== */}
            <div className="lg:hidden fixed bottom-3 left-3 right-3 bg-white shadow-lg rounded-full flex items-center justify-between px-4 py-2 z-50">
                <div>
                    <div className="font-semibold text-lg">${finalPrice}</div>
                    <div className="text-xs text-gray-500">incl. tax</div>
                </div>
                <div className="flex gap-2">
                    <button className="border border-gray-200 px-3 py-2 rounded-full">
                        <FaHeart />
                    </button>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center gap-2">
                        <FaShoppingCart /> Add
                    </button>
                </div>
            </div>
        </div>
    );
}
