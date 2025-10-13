import { Link } from "react-router";
import { FaCartPlus } from "react-icons/fa";

const CartIcon = ({ count = 0 }) => {
    return (
        <Link
            to="/cart"
            className="relative flex flex-col items-center text-gray-700 hover:text-orange-500 text-sm"
        >
            <FaCartPlus className="text-xl" />
            <span className="text-[10px] md:text-[12px] mt-1">Cart</span>

            {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {count}
                </span>
            )}
        </Link>
    );
};

export default CartIcon;
