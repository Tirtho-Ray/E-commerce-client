import React from 'react';
import {
    FaPercent,
    FaShippingFast,
    FaTools,
    FaWallet,
    FaHeadset,
    FaShoppingBasket,
} from 'react-icons/fa';

const SellerBanner: React.FC = () => {
    const benefits = [
        { icon: <FaPercent />, text: '0% commission fee for 90 days' },
        { icon: <FaShoppingBasket />, text: 'Nationwide Reach' },
        { icon: <FaTools />, text: 'Marketing tools' },
        { icon: <FaShippingFast />, text: 'Reliable Shipping' },
        { icon: <FaWallet />, text: 'Timely Payments' },
        { icon: <FaHeadset />, text: 'Dedicated Support & Training' },
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#048cc2] to-[#45ce0b] text-white rounded-xl p-6 md:p-10 gap-6">
            {/* Left Section */}
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug">
                    OPEN YOUR <span className="text-[#2c0d67]">QUICK BUY</span> ONLINE STORE FOR FREE
                </h1>
                <button className="mt-6 bg-[#4807de] text-[#ffffff] font-bold px-6 py-3 rounded-full shadow hover:scale-105 transition-transform">
                    Be a Seller Today
                </button>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-white text-[#333] rounded-xl p-5 w-full">
                <h2 className="text-[#ef4d24] font-bold text-lg mb-4">New Seller Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="p-3 bg-gray-100 text-[#ef4d24] rounded-lg text-xl">
                                {item.icon}
                            </div>
                            <p className="text-sm font-medium">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellerBanner;
