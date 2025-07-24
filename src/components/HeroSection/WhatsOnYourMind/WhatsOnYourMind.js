import { useState } from "react"
import "./WhatsOnYourMind.css"

const WhatsOnYourMind = ({ darkMode }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const cuisines = [
        {
            name: "American",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&crop=center",
            color: "#87CEEB",
        },
        {
            name: "Bengali",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center",
            color: "#FFB347",
        },
        {
            name: "Caribbean",
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop&crop=center",
            color: "#FFB6C1",
        },
        {
            name: "Chinese",
            image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=200&h=200&fit=crop&crop=center",
            color: "#9370DB",
        },
        {
            name: "Fast Food",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop&crop=center",
            color: "#CD853F",
        },
        {
            name: "French",
            image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=200&fit=crop&crop=center",
            color: "#DDA0DD",
        },
        {
            name: "Indian",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop&crop=center",
            color: "#FF7F50",
        },
        {
            name: "Italian",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center",
            color: "#F0E68C",
        },
        {
            name: "Japanese",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=200&fit=crop&crop=center",
            color: "#FFB6C1",
        },
        {
            name: "Mexican",
            image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=200&h=200&fit=crop&crop=center",
            color: "#98FB98",
        },
        {
            name: "Thai",
            image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=200&h=200&fit=crop&crop=center",
            color: "#F4A460",
        },
    ]

    const itemsPerView = 9
    const maxIndex = Math.max(0, cuisines.length - itemsPerView)

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }

    return (
        <div className="whats-on-your-mind">
            <h2 className="section-title">What's on Your Mind?</h2>

            <div className="cuisine-carousel">
                <button className="carousel-btn prev-btn" onClick={prevSlide} disabled={currentIndex === 0}>
                    ‹
                </button>

                <div className="cuisine-container">
                    <div className="cuisine-track" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
                        {cuisines.map((cuisine, index) => (
                            <div key={index} className="cuisine-item">
                                <div className="cuisine-image" style={{ backgroundColor: cuisine.color }}>
                                    <img src={cuisine.image || "/placeholder.svg"} alt={cuisine.name} />
                                </div>
                                <span className="cuisine-name">{cuisine.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="carousel-btn next-btn" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
                    ›
                </button>
            </div>
        </div>
    )
}

export default WhatsOnYourMind