const Congratulation = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center space-y-6">
                <div className="flex justify-center">
                    <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Congratulations!</h1>
                <p className="text-gray-600">
                    Your vendor request has been successfully submitted. Our team will review your application shortly.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <a
                        href="/"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Go to Home
                    </a>
                    <a
                        href="/marketplace"
                        className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300"
                    >
                        Browse Marketplace
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Congratulation;
