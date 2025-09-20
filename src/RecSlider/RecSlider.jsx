import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './RecSlider.css';

export const RecSlider = ({searchInput, games}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsEachSlide, setItemsEachSlide] = useState(4);

    // Responsiveness
    const updateItemsEachSlide = () => {
        const width = window.innerWidth;

        if(width >= 1024){
            setItemsEachSlide(4);
        }
        else if(width >= 768){
            setItemsEachSlide(3);
        }
        else if(width >= 640){
            setItemsEachSlide(2);
        }
        else{
            setItemsEachSlide(4);
        }
    }

    useEffect(() => {
        updateItemsEachSlide();
        window.addEventListener('resize', updateItemsEachSlide);
        
        return () => window.removeEventListener('resize', updateItemsEachSlide);
    }, []);
    
    const prev = () => {
        setCurrentIndex(prevIndex < 0 ? games.length - itemsEachSlide - 1 : prevIndex);
        console.log(currentIndex);
    }

    const next = () => {
        setCurrentIndex(nextIndex >= games.length ? 0 : nextIndex);
        console.log(currentIndex);
    }

    const currentCards = games.slice(currentIndex, currentIndex + itemsEachSlide);
    const nextIndex = currentIndex + itemsEachSlide;
    const prevIndex = currentIndex - itemsEachSlide;
   
    return (
        <motion.div className={`recommendation-section ${searchInput === "" ? "" : "grow"}`}>
            <h1 className="gamebank-title">Recommended for You</h1>

             <div className="rec-slider">
                <button className="slider-btn" onClick={prev}>◀</button>

                <motion.div
                    className="rec-slider-track"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                >
                    {currentCards.map((game, idx) => (
                    <div key={idx} className="slider-item">
                        <img 
                            src={game.header_image} 
                            alt={game.name} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />

                        <div className="price-container">
                            <p className="temp">
                                {game.price === 0 ? "Free" : `Rp${Number(game.price).toLocaleString("id-ID")}`}
                            </p>
                        </div>


                    </div>
                    ))}
                </motion.div>

                <button className="slider-btn" onClick={next}>▶</button>
            </div>
        </motion.div>
    );
}
