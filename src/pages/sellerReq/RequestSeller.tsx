import CategoryShowcase from "./CategoryShowcase";
import JoinStepsSeller from "./JoinStepsSeller";
import SellerBanner from "./SellerBanner";
import SellerBenefits from "./SellerBenefits";

const RequestSeller = () => {
    return (
        <div>
            <div className="mt-5">
                <SellerBanner />
            </div>
            <div className="mt-10 md:mt-32">
                <JoinStepsSeller />
            </div>
            <div className="mt-20 md:mt-32">
                <p className="text-center text-2xl  md:text-2xl lg:text-3xl font-bold">New Seller Barefit</p>
                <SellerBenefits />
            </div>
            <div>
                <CategoryShowcase />
            </div>
        </div>
    );
};

export default RequestSeller;