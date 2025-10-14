import React, { type JSX } from 'react';
import {
    FaBlender, FaLaptop, FaMobileAlt, FaCouch, FaDog, FaGamepad, FaBook, FaAppleAlt, FaBiking,
} from 'react-icons/fa';
import {
    GiClothes, GiLipstick, GiMedicinePills, GiCook, GiWatch,
} from 'react-icons/gi';
import { MdOutlineDevicesOther } from 'react-icons/md';

type Category = {
    name: string;
    icon: JSX.Element;
    color: string;
    subcategories: string[];
};

const categories: Category[] = [
    {
        name: 'Clothing',
        icon: <GiClothes />,
        color: 'text-indigo-500',
        subcategories: ['T-shirt', 'Saree', 'Shirt', 'Jama'],
    },
    {
        name: 'Electronics',
        icon: <MdOutlineDevicesOther />,
        color: 'text-blue-500',
        subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Accessories'],
    },
    {
        name: 'Home Appliances',
        icon: <FaBlender />,
        color: 'text-rose-500',
        subcategories: ['Blender', 'Microwave', 'Iron', 'Kettle'],
    },
    {
        name: 'Beauty',
        icon: <GiLipstick />,
        color: 'text-pink-500',
        subcategories: ['Makeup', 'Skincare', 'Perfume', 'Haircare'],
    },
    {
        name: 'Fitness',
        icon: <FaBiking />,
        color: 'text-green-500',
        subcategories: ['Gym Gear', 'Supplements', 'Yoga Mats'],
    },
    {
        name: 'Books',
        icon: <FaBook />,
        color: 'text-yellow-600',
        subcategories: ['Fiction', 'Non-fiction', 'Educational'],
    },
    {
        name: 'Toys & Games',
        icon: <FaGamepad />,
        color: 'text-red-500',
        subcategories: ['Consoles', 'Board Games', 'Action Figures'],
    },
    {
        name: 'Groceries',
        icon: <FaAppleAlt />,
        color: 'text-lime-600',
        subcategories: ['Fruits', 'Snacks', 'Beverages'],
    },
    {
        name: 'Furniture',
        icon: <FaCouch />,
        color: 'text-amber-600',
        subcategories: ['Sofas', 'Chairs', 'Tables', 'Beds'],
    },
    {
        name: 'Pet Supplies',
        icon: <FaDog />,
        color: 'text-orange-500',
        subcategories: ['Dog Food', 'Toys', 'Accessories'],
    },
    {
        name: 'Fashion Accessories',
        icon: <GiWatch />,
        color: 'text-fuchsia-600',
        subcategories: ['Watches', 'Belts', 'Jewelry'],
    },
    {
        name: 'Kitchenware',
        icon: <GiCook />,
        color: 'text-emerald-600',
        subcategories: ['Cookware', 'Utensils', 'Storage'],
    },
    {
        name: 'Healthcare',
        icon: <GiMedicinePills />,
        color: 'text-red-400',
        subcategories: ['Vitamins', 'Medicines', 'Wellness'],
    },
    {
        name: 'Mobiles',
        icon: <FaMobileAlt />,
        color: 'text-sky-500',
        subcategories: ['Android', 'iPhone', 'Accessories'],
    },
    {
        name: 'Laptops',
        icon: <FaLaptop />,
        color: 'text-cyan-500',
        subcategories: ['Gaming', 'Business', 'Student'],
    },
];

const CategoryShowcase: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
                Shop by Category
            </h2>
            <h1 className="text-sm sm:text-4xl font-semibold text-center mb-10">What you sell</h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300 hover:border-indigo-400"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`text-3xl ${category.color}`}>{category.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                        </div>
                        <ul className="text-sm text-gray-600 pl-2 space-y-1">
                            {category.subcategories.map((sub, i) => (
                                <li key={i} className="hover:text-indigo-600 cursor-pointer">
                                    • {sub}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryShowcase;
