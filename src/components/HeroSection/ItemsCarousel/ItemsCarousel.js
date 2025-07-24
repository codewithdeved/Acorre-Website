import { useState } from "react"
import "./ItemsCarousel.css"

const ItemsCarousel = ({ darkMode }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const promoItems = [
        {
            id: 1,
            title: "Savor Every Bite,",
            subtitle: "Experience Pure Delight",
            discount: "10% OFF",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center",
            gradient: "linear-gradient(135deg, #ff6b9d, #c44569)",
            buttonColor: "#ffffff",
        },
        {
            id: 2,
            title: "Taste Tradition, Enjoy",
            subtitle: "Every Moment",
            discount: "15% OFF",
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center",
            gradient: "linear-gradient(135deg, #ff7f50, #ff6347)",
            buttonColor: "#ffffff",
        },
        {
            id: 3,
            title: "Juicy Bites, Flavor",
            subtitle: "Explosion, Pure Bliss!",
            discount: "20% OFF",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center",
            gradient: "linear-gradient(135deg, #9b59b6, #8e44ad)",
            buttonColor: "#ffffff",
        },
    ]

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % promoItems.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + promoItems.length) % promoItems.length)
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    return (
        <div className="items-carousel">
            <div className="carousel-container">
                <button className="carousel-nav-btn prev-nav-btn" onClick={prevSlide}>
                    ‹
                </button>

                <div className="carousel-wrapper">
                    <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {promoItems.map((item, index) => (
                            <div key={item.id} className="promo-card" style={{ background: item.gradient }}>
                                <div className="promo-content">
                                    <div className="promo-text">
                                        <h3 className="promo-title">{item.title}</h3>
                                        <p className="promo-subtitle">{item.subtitle}</p>
                                        <button className="order-btn" style={{ backgroundColor: item.buttonColor }}>
                                            Order Now
                                        </button>
                                    </div>

                                    <div className="promo-image-container">
                                        <img src={item.image || "/placeholder.svg"} alt="Delicious food" className="promo-image" />
                                        <div className="discount-badge">
                                            <span className="discount-text">{item.discount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="carousel-nav-btn next-nav-btn" onClick={nextSlide}>
                    ›
                </button>
            </div>

            <div className="carousel-indicators">
                {promoItems.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => goToSlide(index)}
                    >
                        {/* {index + 1}/{promoItems.length} */}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ItemsCarousel