import { FaHeart, FaShoppingCart } from "react-icons/fa";

const PopularProduct = () => {
    return (
        <div className="relative  bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden font-sans h-[200px] w-[160px] md:h-[290px] md:w-[240px]">

            {/* Image Section */}
            <div className="relative h-[100px] md:h-[180px] group overflow-hidden">
                {/* Product Image */}
                <img
                    src="https://res.cloudinary.com/dwl8yvfxb/image/upload/v1760943080/k4v4nwmy1x-1760943077983-picture-Beauty.png"
                    alt="White traditional long dress"
                    className=" h-[100px] w-full md:w-full md:h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] md:text-[11px] px-2 py-0.5 rounded-full shadow z-20">
                    -25%
                </span>

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 bg-white shadow-md rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center  z-20 transition-all duration-300 hover:scale-110" >
                    <FaHeart />
                </button>

                {/* Add to Cart Floating Button */}
                <button className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-20">
                    <FaShoppingCart />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-2 md:p-3 md:mt-2">
                <h3 className="text-[15px] font-semibold text-gray-800 line-clamp-1">
                    T-shirt
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-600 font-bold  text-[15px]">$3.99</span>
                    <span className="text-gray-400 text-xs line-through text-[13px]">$5.99</span>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2 text-yellow-500 text-[14px]">
                    ⭐ 4.8
                </div>
            </div>
        </div>
    );
};

export default PopularProduct;
