import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "./Slider/Slider";
import { SearchBar } from "./SearchBar/SearchBar";

export const Hero = () => {

    const sliders = [
        {
            id: "slider-1",
            images: [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
            ],
            direction: "left",
        },
        {
            id: "slider-2",
            images: [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/391540/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/322330/header.jpg",
            ],
            direction: "right",
        },
        {
            id: "slider-3",
            images: [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg",
            ],
            direction: "left",
        },
        {
            id: "slider-4",
            images: [
                "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg",
                "https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/header.jpg",
            ],
            direction: "right",
        },
    ]

    return (
        <motion.section className="hero-page">
            <div className="overlay"/>
            <div className="slider-container">
                
                {sliders.map((slide) => (
                    <Slider 
                        key={slide.id}
                        id={slide.id}
                        images={slide.images}
                        direction={slide.direction}
                    />
                ))}

            </div>
            <motion.div className="hero-content">
                <h1 className="hero-title">Discover Your Next <i style={{ color: "var(--primary)" }}>Adventure</i></h1>
                <h3 className="hero-subtitle">Explore. Play. Enjoy.</h3>
                <SearchBar />
            </motion.div>
        </motion.section>
    );
}