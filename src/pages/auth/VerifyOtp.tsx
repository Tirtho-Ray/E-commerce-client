import React from 'react';

const VerifyOtp: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-sm p-6 space-y-6">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
                    <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email</p>
                </div>

                {/* OTP Inputs */}
                <form className="space-y-5">
                    <div className="grid grid-cols-6 gap-2 sm:gap-3 justify-center">
                        {[...Array(6)].map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                inputMode="numeric"
                                className="w-10 h-12 sm:w-12 sm:h-14 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Verify
                    </button>
                </form>

                {/* Resend OTP */}
                <p className="text-center text-sm text-gray-500">
                    Didn’t receive the code?{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                        Resend
                    </a>
                </p>
            </div>
        </div>
    );
};

export default VerifyOtp;
