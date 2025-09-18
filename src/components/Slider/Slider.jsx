import { useState, useEffect } from "react";
import './Slider.css'

export const Slider = (props) => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        setSlides([...props.images, ...props.images])
    }, [props.images]);

    return (
        <div className="slider">
            <div className={`slider-track ${props.direction === "right" ? "scroll-right" : "scroll-left"}`}>

                {slides.map((src, idx) => (
                    <div className="slide" key={idx}>
                        <img src={src} alt={`Slide ${idx + 1}`} />
                    </div>
                ))}

            </div>
        </div>
    );
}