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

    const [appear, setAppear] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        if(game){
            setCurrentImage(game.screenshots[0]);
            setAppear(true);
        }
        else{
            setAppear(false);
        }
    }, [game])

    if(!game){
        return null
    }

    const review_color = {
        "Overwhelmingly Positive": "#0F7CEB",
        "Very Positive": "#3399FF",
        "Positive": "#4A90E2",
        "Mostly Positive": "#4A90E2",
        "Mixed": "#FFC300",
        "Mostly Negative": "#E2574C",
        "Negative": "#E2574C",
        "Very Negative": "#C0392B",
        "Overwhelmingly Negative": "#C0392B",
    };

    return(
        <motion.div className={`detail-section ${appear ? "display" : ""}`}>
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
                        <h1 className="item-name">{game.name}</h1>
                        <h3 className="item-desc">{game.short_description}</h3>
                        <h4 className="item-price">{game.price === 0 ? "Free" : `Rp${Number(game.price).toLocaleString("id-ID")}`}</h4>

                        <div className="classifier-wrapper">
                            <p className="classifier">REVIEWS: </p>
                            <p style={{ color: (review_color[game.review_score_text] || "var(--text-color)"), fontWeight: "700" }}>{game.review_score_text} <span style={{ color: "var(--text-color)", fontWeight: "400" }}>({game.review_count.toLocaleString()})</span></p>
                        </div>
                        <div className="classifier-wrapper" style={{ marginBottom: "2rem" }}>
                            <p className="classifier">RELEASE DATE: </p>
                            <p>{game.release_date}</p>
                        </div>

                        <div className="classifier-wrapper">
                            <p className="classifier">DEVELOPER: </p>
                            <p>{game.developers[0]}</p>
                        </div>
                        <div className="classifier-wrapper" style={{ marginBottom: "2rem" }}>
                            <p className="classifier">PUBLISHER: </p>
                            <p>{game.publishers[0]}</p>
                        </div>

                        <div>
                            <p className="classifier">GENRES</p>
                            <div className="item-genre-wrapper">
                                {game.genres.map((genre, idx) => (
                                    <div key={idx} className="item-genre">
                                        <p>{genre}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}