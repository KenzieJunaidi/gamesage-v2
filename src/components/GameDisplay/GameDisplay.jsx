import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import './GameDisplay.css';

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const cardFade = (idx) => ({
    hidden: {opacity: 0, y: 20},
    show: {opacity: 1, y: 0, transition: { duration: 0.2, delay: (idx % 8) * 0.1 }},
});

export const GameDisplay = (props) => {

    const [pageNum, setPageNum] = useState(1);

    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if(loading){
            return
        }

        if(observer.current){
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNum(prev => prev + 1);
            }
        })
        
        if(node){
            observer.current.observe(node)
        }
    }, [loading, hasMore]);

    useEffect(() => {
        let cancel

        setLoading(true);
        setError(false);

        axios({
            method: 'GET',
            url: "/steam_games.json",
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            
            let filtered = Object.values(res.data);

            // Apply Filters
            if(props.filters.length > 0){
                filtered = filtered.filter(game =>
                    props.filters.every(f => game.genres.includes(f))
                );
            }
            filtered.sort((a, b) => b.review_count - a.review_count);

            // Pagination Settings
            const pageSize = 8;
            const start = (pageNum - 1) * pageSize;
            const end = start + pageSize;
            const nextPage = filtered.slice(start, end);

            if (pageNum === 1) {
            setGames(nextPage);
            } else {
            setGames((prev) => [...prev, ...nextPage]);
            }

            setHasMore(end < filtered.length);
            setLoading(false);

        }).catch(e => {
            if(axios.isCancel(e)) return
            setError(true);
        })

        return () => cancel()
    }, [pageNum, props.filters])

    useEffect(() => {
        setPageNum(1);
        setGames([]);
    }, [props.filters]);

    return (
        <motion.div className="card-container" variants={staggerContainer} initial="hidden" animate="show">
            
            {games.map((game, idx) => {
                return (
                    <motion.div key={idx} className="card" ref={games.length === idx + 1 ? lastElementRef : null} 
                        onClick={() => props.handleCardClick(game)}
                        variants={cardFade(idx)} whileHover={{ translateY: "-5px", scale: 1.025 }}
                    >
                        <motion.div style={{
                            backgroundImage: `url("${game.header_image}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            aspectRatio: "460 / 215",
                            borderRadius: "10px 10px 0 0",
                        }} />
                        <motion.div className="card-content">
                            <div>
                                <h2 className="game-title">{game.name}</h2>
                                {game.price === 0 ? 
                                <h5 className="game-price item-container">Free</h5>
                                :
                                <h5 className="game-price item-container">Rp{game.price.toLocaleString("id-ID")}</h5>
                                }

                                <div className="game-desc">
                                    <p>{game.short_description.length > 130 ? game.short_description.slice(0, 130).trimEnd() + "..." : game.short_description}</p>
                                </div>
                            </div>
    
                            <div>
                                <div className="card-genres">
                                    {game.genres.slice(0, 3).map((genre, idx) => (
                                        <span key={idx} className="genre">
                                            {genre}
                                        </span>
                                    ))}

                                    {game.genres.length > 3 && (
                                        <span className="genre-more">+ {game.genres.length - 3}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}

        </motion.div>
    );
}