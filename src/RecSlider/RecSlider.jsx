import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./RecSlider.css";

export const RecSlider = ({ searchInput, games, handleCardClick }) => {

    const swiperRef = useRef(null);
    const sliderContainerRef = useRef(null);

    // Update Carousel on SearchInput
    useEffect(() => {
        if(swiperRef.current && sliderContainerRef.current){
            const isVisible = sliderContainerRef.current.classList.contains("grow");
            if (isVisible) {
                swiperRef.current.update();
            }
        }
    }, [searchInput]);

    return (
        <motion.div className={`recommendation-section ${searchInput === "" ? "" : "grow"}`} ref={sliderContainerRef}>
            <h1 className="gamebank-title">Recommended for You</h1>

            <h5 className="reference-tag">BASED OF <span className="choice" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{searchInput}</span> </h5>

            <motion.div className="rec-slider-container">
                <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                    modules={[Navigation]}
                    navigation
                    // slidesPerView={1}
                    // slidesPerGroup={1}
                    speed={800}
                    allowTouchMove={false}
                    slideToClickedSlide
                    loop
                    breakpoints={{
                        320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 10 },
                        550: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 15 },
                        900: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
                        1240: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20},
                    }}
                >
                    {games.map((game, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="slider-item"
                                onClick={() => handleCardClick(game)}
                            >
                                <img
                                    src={game.header_image}
                                    alt={game.name}
                                />
                                <div className="price-container">
                                    <p className="price">
                                        {game.price === 0
                                            ? "Free"
                                            : `Rp${Number(game.price).toLocaleString("id-ID")}`}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </motion.div>
    );
};