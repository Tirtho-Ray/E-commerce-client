import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import image1 from "../../assets/slider/pic-1.png";
import image2 from "../../assets/slider/pic-2.png";
import image3 from "../../assets/slider/pic-3.png";
import image4 from "../../assets/slider/pic-4.png";
import image5 from "../../assets/slider/pic-5.png";

const images = [image1, image2, image3, image4, image5];

const HeroSlider: React.FC = () => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden shadow-md">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                onBeforeInit={(swiper) => {
                    if (
                        typeof swiper.params.navigation !== "boolean" &&
                        swiper.params.navigation
                    ) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                className="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px]"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                    </SwiperSlide>
                ))}


                <button
                    ref={prevRef}
                    className="absolute top-1/2 left-3 sm:left-6 z-20 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
                >
                    <FaArrowLeft size={18} />
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-1/2 right-3 sm:right-6 z-20 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
                >
                    <FaArrowRight size={18} />
                </button>
            </Swiper>
        </div>
    );
};

export default HeroSlider;
