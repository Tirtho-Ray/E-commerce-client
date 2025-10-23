

const ProductCardSkeleton = () => {
    return (
        <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden font-sans h-[200px] w-[160px] md:h-[290px] md:w-[190px] lg:h-[350px] lg:w-[240px] animate-pulse">
            <div className="h-[100px] md:h-[160px] lg:h-[200px] bg-gray-200" />

            <div className="p-2 md:p-3 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="flex items-center space-x-2">
                    <div className="h-4 w-10 bg-gray-300 rounded" />
                    <div className="h-3 w-8 bg-gray-200 rounded" />
                </div>
                <div className="h-3 w-12 bg-gray-300 rounded" />
                <div className="mt-2">
                    <div className="h-3 w-10 bg-gray-300 rounded mb-1" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
                <div className="mt-2 h-3 w-24 bg-gray-200 rounded" />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
