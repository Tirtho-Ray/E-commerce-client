import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchBar = ({ value, onChange }: any) => {
    const handleClear = () => onChange("");

    return (
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm bg-white">
            <div className="px-3 text-gray-500">
                <FaSearch />
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search products..."
                className="flex-grow px-3 py-2 text-sm focus:outline-none"
            />

            {value && (
                <button
                    onClick={handleClear}
                    className="p-2 text-gray-400 hover:text-gray-600 transition"
                >
                    <IoClose size={18} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
