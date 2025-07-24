import { useState } from "react"
import "./HighlightsForYou.css"

const HighlightsForYou = ({ darkMode }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const highlights = [
        {
            id: 1,
            type: "featured",
            title: "Premium Electronics Sale",
            subtitle: "Latest Tech at Unbeatable Prices",
            description:
                "Discover cutting-edge electronics with up to 60% off. From smartphones to laptops, find your perfect tech companion.",
            image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop&crop=center",
            rating: 4.8,
            reviews: 2847,
            discount: "60% OFF",
            category: "Electronics",
            cta: "Shop Now",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        {
            id: 2,
            type: "promotion",
            title: "Fashion Forward Collection",
            subtitle: "Trendy Styles for Every Season",
            description:
                "Elevate your wardrobe with our curated fashion collection. Premium quality meets affordable luxury.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center",
            rating: 4.6,
            reviews: 1923,
            discount: "45% OFF",
            category: "Fashion",
            cta: "Explore",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        },
        {
            id: 3,
            type: "special",
            title: "Gourmet Food Festival",
            subtitle: "Culinary Excellence Delivered",
            description:
                "Indulge in premium culinary experiences. From artisanal ingredients to gourmet meals, taste the difference.",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&crop=center",
            rating: 4.9,
            reviews: 3156,
            discount: "35% OFF",
            category: "Food & Dining",
            cta: "Order Now",
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        },
        {
            id: 4,
            type: "beauty",
            title: "Skincare Essentials",
            subtitle: "Radiant Skin Starts Here",
            description: "Transform your skincare routine with premium beauty products. Natural ingredients, proven results.",
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop&crop=center",
            rating: 4.7,
            reviews: 1654,
            discount: "50% OFF",
            category: "Beauty & Skincare",
            cta: "Discover",
            gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        },
    ]

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % highlights.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
    }

    return (
        <section className="highlights-section">
            <div className="container">
                <div className="section-header">
                    <div className="header-content">
                        <h2 className="section-title">Highlights for You</h2>
                        <p className="section-subtitle">Discover our most popular products and exclusive offers</p>
                    </div>
                    <div className="sparkle-icon">✨</div>
                </div>

                <div className="highlights-carousel">
                    <button className="carousel-nav-btn prev-btn" onClick={prevSlide} aria-label="Previous highlight">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div className="carousel-container">
                        <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {highlights.map((highlight, index) => (
                                <div key={highlight.id} className="highlight-card">
                                    <div className="card-background" style={{ background: highlight.gradient }}>
                                        <div className="card-content">
                                            <div className="content-left">
                                                <div className="category-badge">{highlight.category}</div>
                                                <h3 className="card-title">{highlight.title}</h3>
                                                <p className="card-subtitle">{highlight.subtitle}</p>
                                                <p className="card-description">{highlight.description}</p>

                                                <div className="card-meta">
                                                    <div className="rating">
                                                        <div className="stars">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className={`star ${i < Math.floor(highlight.rating) ? "filled" : ""}`}>
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="rating-text">
                                                            {highlight.rating} ({highlight.reviews.toLocaleString()})
                                                        </span>
                                                    </div>
                                                </div>

                                                <button className="cta-button">
                                                    {highlight.cta}
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <path
                                                            d="M5 12H19M19 12L12 5M19 12L12 19"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="content-right">
                                                <div className="image-container">
                                                    <img
                                                        src={highlight.image || "/placeholder.svg"}
                                                        alt={highlight.title}
                                                        className="highlight-image"
                                                    />
                                                    <div className="discount-badge">
                                                        <span>{highlight.discount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="carousel-nav-btn next-btn" onClick={nextSlide} aria-label="Next highlight">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 18L15 12L9 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="carousel-indicators">
                    {highlights.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? "active" : ""}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <span className="indicator-progress"></span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HighlightsForYou