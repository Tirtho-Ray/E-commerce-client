import React, { type JSX } from 'react';
import { FaShippingFast, FaUsers, FaClock, FaBullhorn } from 'react-icons/fa';
import { MdOutlinePublic } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';

interface Feature {
    icon: JSX.Element;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: <GiConfirmed className="text-violet-500" size={40} />,
        title: '0% Commission',
        description: '0% Platform commission fee for 30 Days',
    },
    {
        icon: <FaShippingFast className="text-emerald-500" size={40} />,
        title: 'Free Shipping',
        description: 'Offer Free Shipping via programs like FSM',
    },
    {
        icon: <MdOutlinePublic className="text-orange-500" size={40} />,
        title: 'Nationwide Reach',
        description: 'Deliver your product anywhere in the country',
    },
    {
        icon: <FaUsers className="text-indigo-500" size={40} />,
        title: 'Dedicated Support & Training',
        description: 'Incubation specialist support for 90 days',
    },
    {
        icon: <FaBullhorn className="text-orange-500" size={40} />,
        title: 'Marketing Tools',
        description: 'Create Product Ads to increase visibility in search results',
    },
    {
        icon: <FaClock className="text-violet-500" size={40} />,
        title: 'Timely Payments',
        description: 'Weekly payment cycles',
    },
];

const SellerBenefits: React.FC = () => {
    return (
        <section className="px-6 py-12 max-w-7xl mx-auto">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                    >
                        <div className="mb-4 flex justify-center">{feature.icon}</div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-500 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SellerBenefits;
