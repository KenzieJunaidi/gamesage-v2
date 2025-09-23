import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Thumbs, FreeMode, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./GameDetails.css";

export const GameDetails = ({ game, setSelectedGame }) => {

    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        if(game){
            setCurrentImage(game.screenshots[0]);
        }
    }, [game])

    if(!game){
        return null;
    }

    return(
        <motion.div className="detail-section">
            <motion.div className="detail-card">
                <div className="back-btn" onClick={() => setSelectedGame(null)}>
                    <i class="fa-solid fa-arrow-left"></i>
                    <h5 className="back-text">Back</h5>
                </div>

                <motion.div className="detail-container">
                    <motion.div className="img-layout">
                        <div className="main-box A">
                            <img src={currentImage}></img>
                        </div>
                        <div className={`img-box B ${game.screenshots[0] === currentImage ? "border" : ""}`} onClick={() => setCurrentImage(game.screenshots[0])}>
                            <img src={game.screenshots[0]}></img>
                        </div>
                        <div className={`img-box C ${game.screenshots[1] === currentImage ? "border" : ""}`} onClick={() => setCurrentImage(game.screenshots[1])}>
                            <img src={game.screenshots[1]}></img>
                        </div>
                        <div className={`img-box D ${game.screenshots[2] === currentImage ? "border" : ""}`} onClick={() => setCurrentImage(game.screenshots[2])}>
                            <img src={game.screenshots[2]}></img>
                        </div>
                    </motion.div>

                    <div className="item-detail">
                        <h1>{game.name}</h1>
                        <h3>{game.short_description}</h3>
                        <h4>{game.price === 0 ? "Free" : `Rp${Number(game.price).toLocaleString("id-ID")}`}</h4>

                        <div>
                            <p>REVIEWS: </p>
                            <p>{game.review_score_text} <span>({game.review_count.toLocaleString()})</span></p>
                        </div>
                        <div>
                            <p>RELEASE DATE: </p>
                            <p>{game.release_date}</p>
                        </div>

                        <div>
                            <p>DEVELOPER: </p>
                            <p>{game.developers[0]}</p>
                        </div>
                        <div>
                            <p>PUBLISHER: </p>
                            <p>{game.publishers[0]}</p>
                        </div>

                        <div>
                            <p>GENRES</p>
                            {game.genres.map((genre, idx) => (
                                <div key={idx}>
                                    <p>{genre}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}