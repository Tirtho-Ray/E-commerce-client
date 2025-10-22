/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
    MdKeyboardArrowUp,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useGetCategory } from "../../hooks/queries/useCategory";

type TCategory = {
    id: string;
    name: string;
};

type FilterSection = "category" | "price" | "rating";

interface FilterToggleState {
    category: boolean;
    price: boolean;
    rating: boolean;
}

const ProductFilter = () => {
    const { data = { data: [] } } = useGetCategory();
    const [isOpen, setIsOpen] = useState<FilterToggleState>({
        category: true,
        price: true,
        rating: true,
    });

    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [minRating, setMinRating] = useState<number | null>(null);
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
        min: "",
        max: "",
    });

    const toggleSection = (section: FilterSection) => {
        setIsOpen((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-4">
            {/* Category Filter */}
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-sm md:text-xs font-medium">All Categories</p>
                    <button onClick={() => toggleSection("category")}>
                        {isOpen.category ? (
                            <MdOutlineKeyboardArrowUp size={24} />
                        ) : (
                            <MdOutlineKeyboardArrowDown size={24} />
                        )}
                    </button>
                </div>

                {isOpen.category && (
                    <ul className="mt-2 space-y-2">
                        <li
                            className={`flex items-center gap-2 cursor-pointer ${selectedCategory === "all" ? "font-bold text-green-600" : ""
                                }`}
                            onClick={() => setSelectedCategory("all")}
                        >
                            <span>All</span>
                        </li>
                        {data?.data?.map((category: TCategory) => {
                            const categoryKey = category.name.toLowerCase();
                            const isSelected = selectedCategory === categoryKey;

                            return (
                                <li
                                    key={category.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setSelectedCategory(categoryKey)}
                                >
                                    <div
                                        className={`h-[17px] w-[17px] rounded-full border-2 flex items-center justify-center ${isSelected ? "border-green-600" : "border-gray-300"
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="h-[10px] w-[10px] bg-green-600 rounded-full" />
                                        )}
                                    </div>
                                    <span className="text-xs md:text-[10px] lg:text-[12px] capitalize">
                                        {category.name}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Price Filter */}
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-sm md:text-xs font-medium">Price</p>
                    <button onClick={() => toggleSection("price")}>
                        {isOpen.price ? (
                            <MdOutlineKeyboardArrowUp size={24} />
                        ) : (
                            <MdOutlineKeyboardArrowDown size={24} />
                        )}
                    </button>
                </div>

                {isOpen.price && (
                    <div className="mt-2 flex gap-2">
                        <input
                            type="text"
                            name="min"
                            value={priceRange.min}
                            onChange={handlePriceChange}
                            placeholder="Min"
                            className="border w-20 h-8 rounded-md px-2 text-xs"
                        />
                        <input
                            type="text"
                            name="max"
                            value={priceRange.max}
                            onChange={handlePriceChange}
                            placeholder="Max"
                            className="border w-20 h-8 rounded-md px-2 text-xs"
                        />
                    </div>
                )}
            </div>

            {/* Rating Filter */}
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-base font-medium">Rating</p>
                    <button onClick={() => toggleSection("rating")}>
                        {isOpen.rating ? (
                            <MdKeyboardArrowUp size={24} />
                        ) : (
                            <MdOutlineKeyboardArrowDown size={24} />
                        )}
                    </button>
                </div>

                {isOpen.rating && (
                    <div className="mt-2 space-y-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <label key={rating} className="flex items-center gap-2 cursor-pointer text-sm">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={minRating === rating}
                                    onChange={() => setMinRating(rating)}
                                    className="accent-yellow-500"
                                />
                                <span className="text-yellow-500">
                                    {"★".repeat(rating)}
                                    <span className="text-gray-500 ml-1 text-[12px]"> </span>
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilter;
