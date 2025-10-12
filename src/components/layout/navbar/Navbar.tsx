import { useState } from "react";
import { Link } from "react-router";
import { FaCartPlus, FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const isLoggedIn = false;
    const userName = "Rax-009";
    const cartItemCount = 3;
    const isVendor = false;

    const handleClear = () => setSearch("");

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 py-2">

            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between px-4 py-3 md:hidden">

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2xl text-gray-700"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>


                <Link to="/" className="text-lg font-bold text-orange-500">
                    EasyBuy
                </Link>


                <div className="flex items-center gap-4">

                    {!isLoggedIn &&
                        <Link to="/login" className="flex flex-col items-center text-gray-700 hover:text-orange-500 text-sm">
                            <FaUser className="text-xl" />
                            <span className="text-[10px] mt-1">Login</span>
                        </Link>
                    }


                    <Link to="/cart" className="relative flex flex-col items-center text-gray-700 hover:text-orange-500 text-sm">
                        <FaCartPlus className="text-xl" />
                        <span className="text-[10px] mt-1">Cart</span>
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    </Link>
                </div>
            </div>

            {/* MOBILE SEARCH BAR */}
            <div className="px-4 pb-3 md:hidden">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
                    <div className="p-3 text-gray-500 bg-gray-100">
                        <FaSearch />
                    </div>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="flex-grow px-3 py-2 text-sm focus:outline-none"
                    />

                    {search && (
                        <button
                            onClick={handleClear}
                            className="p-3 text-gray-400 hover:text-gray-600 transition"
                        >
                            <IoClose size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* MOBILE MENU LINKS */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 border-t pt-2 bg-gray-50 animate-fadeIn">
                    <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
                        {
                            isVendor ? <div>Dashboard</div> : <div> <Link
                                to="/seller"
                                className="hover:text-orange-500 transition-colors "
                                onClick={() => setMenuOpen(false)}
                            >
                                Become a Seller
                            </Link></div>
                        }
                        {isLoggedIn &&
                            <span className="text-orange-500 font-semibold">
                                Hello, {userName}
                            </span>
                        }
                    </div>
                </div>
            )}

            {/* DESKTOP NAVBAR */}
            <div className="hidden md:flex items-center justify-between px-8 py-3 max-w-7xl mx-auto">

                <div className="text-2xl font-bold text-orange-500">
                    <Link to="/">EasyBuy</Link>
                </div>

                <div className="flex items-center border border-gray-300 rounded-full shadow-sm overflow-hidden w-[300px] lg:w-[500px]">
                    <div className="px-4 text-gray-500">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for products..."
                        className="flex-grow px-3 py-3 focus:outline-none text-sm"
                    />
                    {search && (
                        <button
                            onClick={handleClear}
                            className="px-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <IoClose size={18} />
                        </button>
                    )}
                </div>


                <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
                    {isVendor ? <button className="px-4 py-2 bg-teal-400 rounded-lg">Dashboard</button> : <Link to="/seller" className="hover:text-orange-500 transition-colors">
                        Become a Seller
                    </Link>}

                    {isLoggedIn ? <>

                        <span className="text-orange-500 font-semibold">
                            Hello, {userName}
                        </span>

                    </> : <>

                        <Link to="/login" className="flex flex-col items-center hover:text-orange-500 text-gray-700 text-sm">
                            <FaUser className="text-xl" />
                            <span className="text-[13px] mt-1">Login</span>
                        </Link>
                    </>}




                    <Link to="/cart" className="relative flex flex-col items-center hover:text-orange-500 text-gray-700 text-sm">
                        <FaCartPlus className="text-xl" />
                        <span className="text-[13px] mt-1">Cart</span>
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
