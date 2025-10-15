import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import SearchBar from "./SearchBar";
import CartIcon from "./Cart";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const isLoggedIn = false;
    const userName = "Rax-009";
    const cartItemCount = 3;
    const isVendor = false;

    return (
        <header className="bg-[linear-gradient(180deg,_#f4e6ff,_#ffffff)] sticky top-0 z-50 py-3 ">

            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between px-4 py-3 md:hidden bg-[linear-gradient(180deg,_#f4e6ff,_#ffffff)] ">
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
                    {!isLoggedIn && (
                        <Link
                            to="/login"
                            className="flex flex-col items-center text-gray-700 hover:text-orange-500 text-sm"
                        >
                            <FaUser className="text-xl" />
                            <span className="text-[10px] mt-1">Login</span>
                        </Link>
                    )}

                    <CartIcon count={cartItemCount} />
                </div>
            </div>

            {/* MOBILE SEARCH BAR */}
            <div className="px-4 pb-3 md:hidden">
                <SearchBar value={search} onChange={setSearch} />
            </div>

            {/* MOBILE MENU LINKS */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 border-t pt-2 bg-gray-50 animate-fadeIn">
                    <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
                        {isVendor ? (
                            <div>Dashboard</div>
                        ) : (
                            <Link
                                to="/request-seller"
                                className="hover:text-orange-500 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Become a Seller
                            </Link>
                        )}

                        {isLoggedIn && (
                            <span className="text-orange-500 font-semibold">
                                Hello, {userName}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* DESKTOP NAVBAR */}
            <div className="hidden md:flex items-center justify-between px-8 py-3 max-w-7xl mx-auto">
                <div className="text-2xl font-bold text-orange-500">
                    <Link to="/">EasyBuy</Link>
                </div>

                <div className="w-[300px] lg:w-[500px]">
                    <SearchBar value={search} onChange={setSearch} />
                </div>

                <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
                    {isVendor ? (
                        <button className="px-4 py-2 bg-teal-400 rounded-lg text-white">
                            Dashboard
                        </button>
                    ) : (
                        <Link to="/request-seller" className="hover:text-orange-500 transition-colors">
                            Become a Seller
                        </Link>
                    )}

                    {isLoggedIn ? (
                        <span className="text-orange-500 font-semibold">
                            Hello, {userName}
                        </span>
                    ) : (
                        <Link
                            to="/login"
                            className="flex flex-col items-center hover:text-orange-500 text-gray-700 text-sm"
                        >
                            <FaUser className="text-xl" />
                            <span className="text-[12px] mt-1">Login</span>
                        </Link>
                    )}

                    <CartIcon count={cartItemCount} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
