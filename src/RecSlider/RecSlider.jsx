import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./RecSlider.css";

export const RecSlider = ({ searchInput, games }) => {
    return (
        <motion.div className={`recommendation-section ${searchInput === "" ? "" : "grow"}`}>
            <h1 className="gamebank-title">Recommended for You</h1>

            <motion.div className="rec-slider-container">
                <Swiper
                    modules={[Pagination, Navigation]}
                    navigation
                    slidesPerView={4}
                    speed={800}
                    allowTouchMove={false}
                    slideToClickedSlide
                    pagination={{clickable: true}}
                    loop
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 20 },
                        650: { slidesPerView: 3, spaceBetween: 15 },
                        1000: { slidesPerView: 4, spaceBetween: 10 },
                    }}
                >
                    {games.map((game, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="slider-item">
                                <img
                                    src={game.header_image}
                                    alt={game.name}
                                />
                                <div className="price-container">
                                    <p className="temp">
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