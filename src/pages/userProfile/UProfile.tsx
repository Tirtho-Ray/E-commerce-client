
import { useGetMe } from "../../hooks/queries/useMe";
import { useState } from "react";
import ProfileEditModal from "./PModal";
;

const UProfile = () => {
    const { data } = useGetMe();
    const [showModal, setShowModal] = useState(false);

    const user = data?.data
    // || {
    //     name: "Sophie Turner",
    //     email: "sophie@example.com",
    //     profilePhoto: "https://randomuser.me/api/portraits/women/65.jpg",
    //     orders: 24,
    //     wishlist: 8,
    //     mobileNumber: "0000000000",
    //     addresses: {
    //         street: "",
    //         city: "",
    //         state: "",
    //         postalCode: "",
    //         country: "",
    //     },
    // };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                    <div className="flex flex-col items-center p-6">
                        <div className="relative">
                            <img
                                src={user?.profilePhoto}
                                alt="User Avatar"
                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            <span className="absolute bottom-1 right-1 bg-green-500 border-2 border-white w-4 h-4 rounded-full"></span>
                        </div>

                        <h2 className="mt-4 text-2xl font-semibold text-gray-800 text-center">
                            {user?.name}
                        </h2>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                    </div>

                    <div className="flex justify-around border-t border-gray-100 py-4 bg-gray-50">
                        <div className="text-center">
                            <p className="text-xl font-bold text-gray-800">{user?.orders}</p>
                            <p className="text-xs text-gray-500">Orders</p>
                        </div>
                        <div className="text-center border-l border-gray-200 pl-6">
                            <p className="text-xl font-bold text-gray-800">{user?.wishlist}</p>
                            <p className="text-xs text-gray-500">Wishlist</p>
                        </div>
                    </div>

                    <div className="flex justify-between gap-3 p-6">
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition duration-200 shadow-sm"
                        >
                            Edit Profile
                        </button>

                        <button className="px-3 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg transition duration-200 shadow-sm">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <ProfileEditModal user={user} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default UProfile;
