import { useState } from "react"
import "./TodaysTrend.css"

const TodaysTrend = ({ darkMode }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showMore, setShowMore] = useState(false)

    const trendingProducts = [
        {
            id: 1,
            name: "Wireless AirPods Pro",
            category: "Electronics",
            restaurant: "TechHub Store",
            originalPrice: 299,
            currentPrice: 199,
            discount: "33% OFF",
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop&crop=center",
            rating: 4.8,
            reviews: 1247,
            isVegetarian: false,
            isNew: true,
        },
        {
            id: 2,
            name: "Organic Face Serum",
            category: "Beauty & Skincare",
            restaurant: "GlowUp Beauty",
            originalPrice: 89,
            currentPrice: 62,
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center",
            rating: 4.9,
            reviews: 892,
            isVegetarian: true,
            isNew: false,
        },
        {
            id: 3,
            name: "Premium Burger Combo",
            category: "Food & Dining",
            restaurant: "Gourmet Kitchen",
            originalPrice: 25,
            currentPrice: 18,
            discount: "28% OFF",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop&crop=center",
            rating: 4.6,
            reviews: 2156,
            isVegetarian: false,
            isNew: false,
        },
        {
            id: 4,
            name: "Designer Sneakers",
            category: "Fashion",
            restaurant: "StyleCraft",
            originalPrice: 180,
            currentPrice: 126,
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&crop=center",
            rating: 4.7,
            reviews: 634,
            isVegetarian: false,
            isNew: true,
        },
        {
            id: 5,
            name: "Smart Home Hub",
            category: "Electronics",
            restaurant: "FutureTech",
            originalPrice: 149,
            currentPrice: 99,
            discount: "34% OFF",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
            rating: 4.5,
            reviews: 423,
            isVegetarian: false,
            isNew: false,
        },
        {
            id: 6,
            name: "Artisan Coffee Blend",
            category: "Food & Dining",
            restaurant: "Roast Masters",
            originalPrice: 32,
            currentPrice: 24,
            discount: "25% OFF",
            image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop&crop=center",
            rating: 4.8,
            reviews: 756,
            isVegetarian: true,
            isNew: false,
        },
        {
            id: 7,
            name: "Luxury Skincare Set",
            category: "Beauty & Skincare",
            restaurant: "Radiance Spa",
            originalPrice: 220,
            currentPrice: 154,
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
            rating: 4.9,
            reviews: 1089,
            isVegetarian: true,
            isNew: true,
        },
        {
            id: 8,
            name: "Vintage Denim Jacket",
            category: "Fashion",
            restaurant: "RetroStyle",
            originalPrice: 95,
            currentPrice: 67,
            discount: "29% OFF",
            image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&crop=center",
            rating: 4.4,
            reviews: 312,
            isVegetarian: false,
            isNew: false,
        },
    ]

    const itemsPerView = 5
    const maxIndex = Math.max(0, trendingProducts.length - itemsPerView)
    const displayedProducts = showMore ? trendingProducts : trendingProducts.slice(0, itemsPerView)

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }

    const addToCart = (product) => {
        console.log("Added to cart:", product)
        // Add cart functionality here
    }

    return (
        <section className="todays-trend-section">
            <div className="container">
                <div className="section-header">
                    <div className="header-content">
                        <h2 className="section-title">Today's Trends</h2>
                        <p className="section-subtitle">Here's what you might like to discover</p>
                    </div>
                    <button className="view-more-btn" onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Show Less" : "View More"}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d={showMore ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="trends-carousel">
                    {!showMore && (
                        <>
                            <button
                                className="carousel-nav-btn prev-btn"
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                aria-label="Previous products"
                            >
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
                        </>
                    )}

                    <div className={`products-container ${showMore ? "show-all" : ""}`}>
                        <div
                            className="products-track"
                            style={{
                                transform: showMore ? "none" : `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                                display: showMore ? "grid" : "flex",
                            }}
                        >
                            {displayedProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                                        <div className="product-badges">
                                            {product.isNew && <span className="badge new-badge">NEW</span>}
                                            {product.isVegetarian && <span className="badge veg-badge">🌱</span>}
                                            <span className="discount-badge">{product.discount}</span>
                                        </div>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={() => addToCart(product)}
                                            aria-label={`Add ${product.name} to cart`}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M12 5V19M5 12H19"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="product-info">
                                        <div className="product-meta">
                                            <span className="category">{product.category}</span>
                                            <span className="restaurant">{product.restaurant}</span>
                                        </div>

                                        <h3 className="product-name">{product.name}</h3>

                                        <div className="rating">
                                            <div className="stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`star ${i < Math.floor(product.rating) ? "filled" : ""}`}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="rating-text">{product.rating}</span>
                                            <span className="reviews">({product.reviews})</span>
                                        </div>

                                        <div className="pricing">
                                            <span className="original-price">${product.originalPrice}</span>
                                            <span className="current-price">${product.currentPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!showMore && (
                        <button
                            className="carousel-nav-btn next-btn"
                            onClick={nextSlide}
                            disabled={currentIndex >= maxIndex}
                            aria-label="Next products"
                        >
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
                    )}
                </div>

                {!showMore && (
                    <div className="carousel-progress">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${((currentIndex + itemsPerView) / trendingProducts.length) * 100}%` }}
                            ></div>
                        </div>
                        <span className="progress-text">
                            {Math.min(currentIndex + itemsPerView, trendingProducts.length)} of {trendingProducts.length} products
                        </span>
                    </div>
                )}
            </div>
        </section>
    )
}

export default TodaysTrend