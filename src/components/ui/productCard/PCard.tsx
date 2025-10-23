import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { formatDateRange } from "../../../utils/formatDate/formatDate";

interface TPCard {
    id?: string;
    name: string;
    image: string;
    discount?: number;
    price: number;
    brand?: string;
    discountPricePercent?: {
        type: "percentage" | "fixed" | null;
        amount: number | null;

        startDate?: Date | null;
        endDate?: Date | null;

        activeTime?: {
            specificDate?: Date | null;
            startDate?: Date | null;
            endDate?: Date | null;
            repeatDaily?: boolean;
        };

        isActive?: boolean;
        noEndDate?: boolean;

        maxUsageLimit?: number;
        usedCount?: number;
    };
    rating?: string;
    onAddToCart?: () => void;
    onWishlist?: () => void;
    onQuickView?: (id: string) => void;
}

const PCard: React.FC<TPCard> = ({
    id,
    name,
    image,
    discount,
    price,
    brand,
    discountPricePercent,
    rating,
    onAddToCart,
    onWishlist,
    onQuickView,
}) => {
    const { startDate, endDate, isActive } = discountPricePercent || {};

    return (
        <div
            onClick={() => onQuickView?.(id!)}
            className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden font-sans h-[200px] w-[160px] md:h-[290px] md:w-[183px] lg:h-[350px] lg:w-[245px]"
        >
            <div className="relative h-[100px] md:h-[160px] lg:h-[200px] group overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-[100px] w-full md:w-full md:h-[160px] lg:h-[300px] object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div>
                    {discountPricePercent?.type === "percentage" &&
                        discountPricePercent?.isActive && (
                            <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] md:text-[11px] px-3 py-0.5 rounded-tr-full rounded-bl-full shadow z-20">
                                {discountPricePercent.amount}% OFF
                            </span>
                        )}
                </div>
                <button
                    onClick={onWishlist}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 bg-white shadow-md rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center z-20 transition-all duration-300 hover:scale-110"
                >
                    <FaHeart />
                </button>
                <button
                    onClick={onAddToCart}
                    className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20"
                >
                    <FaShoppingCart />
                </button>
            </div>

            <div className=" p-2 md:p-3 md:mt-2">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-[15px] font-semibold text-gray-800 line-clamp-1">
                            {name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                            <div>
                                <span className="text-blue-600 font-bold text-[15px] lg:text-[16px]">
                                    {price}$
                                </span>
                            </div>
                            {discountPricePercent?.type === "fixed" &&
                                discountPricePercent?.isActive && (
                                    <span className="text-green-400 text-xs font-semibold text-[13px] lg:text-[14px] font-mono">
                                        -{discount}$ off
                                    </span>
                                )}
                        </div>

                        <div className="flex items-center mt-2 text-yellow-500 text-[14px]">
                            ⭐{rating}
                        </div>
                    </div>
                    <div className="">
                        <p className="text-[10px] md:text-[12px] font-mono text-gray-500">Brand</p>
                        <p className="text-[10px] md:text-[13px] font-mono text-blue-500 line-clamp-1">{brand}</p>
                    </div>
                </div>

                {/* 🗓️ Show Date Range */}
                <div className="flex flex-col text-[10px] md:text-[12px] text-gray-500 text-right font-semibold ">
                    {isActive && (startDate || endDate) ? (
                        <>
                            <span className="font-mono">Offer Valid </span>
                            <span className="font-medium">
                                {formatDateRange(startDate,
                                    endDate)}
                            </span>
                        </>
                    ) : null}
                </div>
            </div>
        </div >
    );
};

export default PCard;
