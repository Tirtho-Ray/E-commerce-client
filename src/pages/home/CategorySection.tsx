import { useEffect, useRef } from "react";
import { useGetCategory } from "../../hooks/queries/useCategory";
import gsap from "gsap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type TCategory = {
    name: string;
    picture: string;
};

const CategorySection = () => {
    const { data } = useGetCategory();
    const cardsRef = useRef<HTMLDivElement[]>([]);

    // GSAP hover animation
    useEffect(() => {
        cardsRef.current.forEach((card) => {
            const hoverIn = () => {
                gsap.to(card, {
                    scale: 1.05,
                    y: -5,
                    duration: 0.4,
                    ease: "power3.out",
                    boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
                });
            };
            const hoverOut = () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                    boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
                });
            };

            card.addEventListener("mouseenter", hoverIn);
            card.addEventListener("mouseleave", hoverOut);
        });
    }, [data]);

    return (
        <section className="relative py-6">
            <h2 className="text-2xl font-semibold px-4 mb-4">
                Explore Categories
            </h2>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={16}
                slidesPerView={"auto"}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                }}
                loop={true}
                className="px-8"
            >
                {data?.data.map((item: TCategory, index: number) => (
                    <SwiperSlide
                        key={item.name}
                        style={{ width: "auto" }}
                    >
                        <div className="mt-2 md:mt-4 mb-5 rounded-xl">
                            <div
                                ref={(el) => {
                                    if (el) cardsRef.current[index] = el;
                                }}
                                className="flex-shrink-0 w-24 sm:w-28 md:w-32 lg:w-[150px] bg-white border border-gray-200 rounded-xl shadow-md cursor-pointer overflow-hidden "
                            >
                                <div className="h-16 w-full sm:h-28 md:h-32 overflow-hidden rounded-t-xl">
                                    <img
                                        src={item.picture}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="py-2 px-2 text-center">
                                    <p className="text-sm font-bold text-gray-800 truncate ">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Arrows (same position & style) */}
            <button
                className="prev-btn absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
                <FaChevronLeft size={18} />
            </button>

            <button
                className="next-btn absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
            >
                <FaChevronRight size={18} />
            </button>
        </section>
    );
};

export default CategorySection;
