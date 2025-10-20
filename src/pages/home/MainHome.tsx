// import HeroSlider from "./HeroSlider";

import CategorySection from "./CategorySection";
import HeroSlider from "./HeroSlider";
import PopularProduct from "./PopularProduct";


const MainHomePage = () => {
    return (
        <div>
            <HeroSlider />
            <CategorySection />
            <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 justify-items-center w-fit">
                <PopularProduct />
                <PopularProduct />
                <PopularProduct />
                <PopularProduct />
                <PopularProduct />
            </div>
        </div>
    );
};

export default MainHomePage;