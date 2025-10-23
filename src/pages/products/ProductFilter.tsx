import { useState } from "react";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useGetCategory } from "../../hooks/queries/useCategory";

type TCategory = { id: string; name: string };

type FilterSection = "category" | "price" | "rating";

interface FilterToggleState {
    category: boolean;
    price: boolean;
    rating: boolean;
}

interface ProductFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    priceRange: { min: string; max: string };
    onPriceChange: (price: { min: string; max: string }) => void;
    minRating: number | null;
    onRatingChange: (rating: number) => void;
}

const ProductFilter = ({
    selectedCategory,
    onCategoryChange,
    priceRange,
    onPriceChange,
    minRating,
    onRatingChange,
}: ProductFilterProps) => {
    const { data = { data: [] } } = useGetCategory();
    const [isOpen, setIsOpen] = useState<FilterToggleState>({
        category: true,
        price: true,
        rating: true,
    });

    const toggleSection = (section: FilterSection) =>
        setIsOpen(prev => ({ ...prev, [section]: !prev[section] }));

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onPriceChange({ ...priceRange, [name]: value });
    };

    return (
        <div className="space-y-4">
            {/* Category */}
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-sm md:text-xs font-medium">All Categories</p>
                    <button onClick={() => toggleSection("category")}>
                        {isOpen.category ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                    </button>
                </div>

                {isOpen.category && (
                    <ul className="mt-2 space-y-2">
                        <li
                            className={`flex items-center gap-2 cursor-pointer ${selectedCategory === "all" ? "font-bold text-green-600" : ""
                                }`}
                            onClick={() => onCategoryChange("all")}
                        >
                            All
                        </li>
                        {data?.data?.map((cat: TCategory) => {
                            const categoryKey = cat.name.toLowerCase();
                            const isSelected = selectedCategory === categoryKey;
                            return (
                                <li
                                    key={cat.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => onCategoryChange(categoryKey)}
                                >
                                    <div
                                        className={`h-[17px] w-[17px] rounded-full border-2 flex items-center justify-center ${isSelected ? "border-green-600" : "border-gray-300"
                                            }`}
                                    >
                                        {isSelected && <div className="h-[10px] w-[10px] bg-green-600 rounded-full" />}
                                    </div>
                                    <span className="text-xs md:text-[10px] lg:text-[12px] capitalize">{cat.name}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Price */}
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-sm md:text-xs font-medium">Price</p>
                    <button onClick={() => toggleSection("price")}>
                        {isOpen.price ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
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

            {/* Rating */}
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-base font-medium">Rating</p>
                    <button onClick={() => toggleSection("rating")}>
                        {isOpen.rating ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                    </button>
                </div>
                {isOpen.rating && (
                    <div className="mt-2 space-y-1">
                        {[5, 4, 3, 2, 1].map(r => (
                            <label key={r} className="flex items-center gap-2 cursor-pointer text-sm">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={minRating === r}
                                    onChange={() => onRatingChange(r)}
                                    className="accent-yellow-500"
                                />
                                <span className="text-yellow-500">{"★".repeat(r)}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilter;
