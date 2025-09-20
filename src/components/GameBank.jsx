import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { GameDisplay } from "./GameDisplay/GameDisplay";
import { RecSlider } from "../RecSlider/RecSlider";

export const GameBank = ({searchInput, setSearchInput}) => {
    const [isActive, setIsActive] = useState([]);
    const [rec, setRec] = useState([]);

    useEffect(() => {
        handleRecommend(searchInput);
    }, [searchInput]);

    const handleActive = (id, e) => {
        
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();

        const offsetTop = rect.top;

        if (offsetTop < 0) {
        window.scrollBy({ top: offsetTop - 20, behavior: "smooth" });
        }

        setIsActive((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    }

    const handleRecommend = async (searchInput) => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/", {
                params: {searchInput}
            });
            setRec(response.data);
            console.log("CHECKING: ", response.data)

        } catch (err) {
            console.error(err.response ? err.response.data : err.message)
        }
    }

    return (
        <motion.section className="gamebank-page">
            <RecSlider searchInput={searchInput} games={rec} />

            <h1 className="gamebank-title">Browse by Category</h1>
            <motion.div className="filter-options">
                <motion.button className={`filter-card ${isActive.includes("Action") ? "active" : ""}`}
                    onClick={(e) => handleActive("Action", e)}
                >
                    <div className="icon-container" />
                    <i className="fas fa-bolt" />
                    <h3>Action</h3>
                </motion.button>
                <motion.button className={`filter-card ${isActive.includes("Adventure") ? "active" : ""}`}
                    onClick={(e) => handleActive("Adventure", e)}
                >
                    <div className="icon-container" />
                    <i className="fas fa-compass" />
                    <h3>Adventure</h3>
                </motion.button>
                <motion.button className={`filter-card ${isActive.includes("RPG") ? "active" : ""}`}
                    onClick={(e) => handleActive("RPG", e)}
                >
                    <div className="icon-container" />
                    <i className="fas fa-dragon" />
                    <h3>RPG</h3>
                </motion.button>
                <motion.button className={`filter-card ${isActive.includes("Simulation") ? "active" : ""}`}
                    onClick={(e) => handleActive("Simulation", e)}
                >
                    <div className="icon-container" />
                    <i className="fas fa-cogs" />
                    <h3>Simulation</h3>
                </motion.button>
                <motion.button className={`filter-card ${isActive.includes("Strategy") ? "active" : ""}`}
                    onClick={(e) => handleActive("Strategy", e)}
                >
                    <div className="icon-container" />
                    <i className="fas fa-chess" />
                    <h3>Strategy</h3>
                </motion.button>
                <motion.button className={`filter-card ${isActive.includes("Sports") ? "active" : ""}`}
                    onClick={(e) => handleActive("Sports", e)}
                >
                    <div className="icon-container" />
                    <i className="fas fa-flag-checkered" />
                    <h3>Sports</h3>
                </motion.button>
            </motion.div>
            <GameDisplay filters={isActive} />
        </motion.section>
    );
}