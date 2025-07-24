import { useState } from "react"
import "./BestReviewedFood.css"

const BestReviewedFood = ({ darkMode }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showMore, setShowMore] = useState(false)

    const bestReviewedProducts = [
        {
            id: 1,
            name: "Artisan Meat Pizza",
            category: "Food & Dining",
            restaurant: "Hungry Puppets",
            originalPrice: 400,
            currentPrice: 370,
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center",
            rating: 4.7,
            reviews: 3,
            isVegetarian: false,
            isFavorite: false,
        },
        {
            id: 2,
            name: "Gourmet Burger Combo",
            category: "Food & Dining",
            restaurant: "Cheese Burger",
            originalPrice: 120,
            currentPrice: 80,
            discount: "33% OFF",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop&crop=center",
            rating: 5.0,
            reviews: 1,
            isVegetarian: false,
            isFavorite: true,
        },
        {
            id: 3,
            name: "Organic Veg Momos",
            category: "Food & Dining",
            restaurant: "Vintage Kitchen",
            originalPrice: 450,
            currentPrice: 320,
            discount: "29% OFF",
            image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=300&fit=crop&crop=center",
            rating: 5.0,
            reviews: 1,
            isVegetarian: true,
            isFavorite: false,
        },
        {
            id: 4,
            name: "Premium Coffee Blend",
            category: "Beverages",
            restaurant: "Redcliff Cafe",
            originalPrice: 45,
            currentPrice: 32,
            discount: "29% OFF",
            image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop&crop=center",
            rating: 5.0,
            reviews: 1,
            isVegetarian: true,
            isFavorite: true,
        },
        {
            id: 5,
            name: "Luxury Skincare Kit",
            category: "Beauty & Skincare",
            restaurant: "Radiance Spa",
            originalPrice: 180,
            currentPrice: 126,
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center",
            rating: 4.8,
            reviews: 2,
            isVegetarian: true,
            isFavorite: false,
        },
        {
            id: 6,
            name: "Smart Fitness Watch",
            category: "Electronics",
            restaurant: "TechHub Store",
            originalPrice: 299,
            currentPrice: 209,
            discount: "30% OFF",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
            rating: 4.9,
            reviews: 4,
            isVegetarian: false,
            isFavorite: true,
        },
    ]

    const restaurants = [
        {
            id: 1,
            name: "Café Monarch",
            location: "Ghatkopar - Mankhurd",
            rating: 5.0,
            distance: "100+ km",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop&crop=center",
            icon: "☕",
        },
        {
            id: 2,
            name: "Vintage Kitchen",
            location: "House: 00, Road: 00, Str...",
            rating: 5.0,
            distance: "100+ km",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&crop=center",
            icon: "🍽️",
        },
        {
            id: 3,
            name: "Redcliff Cafe",
            location: "House: 00, Road: 00, Str...",
            rating: 4.5,
            distance: "100+ km",
            image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=100&h=100&fit=crop&crop=center",
            icon: "🏔️",
        },
    ]

    const cuisines = [
        {
            name: "Bengali",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center",
        },
        {
            name: "Chinese",
            image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=100&h=100&fit=crop&crop=center",
        },
        {
            name: "Japanese",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100&h=100&fit=crop&crop=center",
        },
        {
            name: "Italian",
            image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=100&h=100&fit=crop&crop=center",
        },
        {
            name: "Indian",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=100&h=100&fit=crop&crop=center",
        },
        {
            name: "Fast Food",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop&crop=center",
        },
        {
            name: "Spanish",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&h=100&fit=crop&crop=center",
        },
    ]

    const itemsPerView = 6
    const maxIndex = Math.max(0, bestReviewedProducts.length - itemsPerView)
    const displayedProducts = showMore ? bestReviewedProducts : bestReviewedProducts.slice(0, itemsPerView)

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }

    const toggleFavorite = (productId) => {
        console.log("Toggle favorite:", productId)
        // Add favorite functionality here
    }

    const addToCart = (product) => {
        console.log("Added to cart:", product)
        // Add cart functionality here
    }

    return (
        <section className="best-reviewed-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Best Reviewed Products</h2>
                    <button className="view-all-btn" onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Show Less" : "View All"}
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

                <div className="products-carousel">
                    {!showMore && (
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
                                            <span className="discount-badge">{product.discount}</span>
                                            {product.isVegetarian && <span className="veg-badge">🌱</span>}
                                        </div>
                                        <button
                                            className={`favorite-btn ${product.isFavorite ? "active" : ""}`}
                                            onClick={() => toggleFavorite(product.id)}
                                            aria-label={`${product.isFavorite ? "Remove from" : "Add to"} favorites`}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill={product.isFavorite ? "currentColor" : "none"}
                                            >
                                                <path
                                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
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

                <div className="dine-in-section">
                    <div className="dine-in-card">
                        <div className="dine-in-content">
                            <div className="dine-in-illustration">
                                <div className="illustration-character">🧑‍🍳</div>
                                <div className="illustration-table">🍽️</div>
                            </div>
                            <div className="dine-in-info">
                                <h3 className="dine-in-title">Want to Dine In?</h3>
                                <p className="dine-in-subtitle">Discover amazing restaurants near you</p>
                            </div>
                        </div>

                        <div className="restaurants-list">
                            {restaurants.map((restaurant) => (
                                <div key={restaurant.id} className="restaurant-card">
                                    <div className="restaurant-image">
                                        <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} />
                                        <div className="restaurant-icon">{restaurant.icon}</div>
                                    </div>
                                    <div className="restaurant-info">
                                        <h4 className="restaurant-name">{restaurant.name}</h4>
                                        <p className="restaurant-location">{restaurant.location}</p>
                                        <div className="restaurant-meta">
                                            <div className="restaurant-rating">
                                                <span className="star">★</span>
                                                <span>{restaurant.rating}</span>
                                            </div>
                                            <div className="restaurant-distance">
                                                <span className="distance-icon">📍</span>
                                                <span>{restaurant.distance}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="view-all-restaurants-btn">
                            View All
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
                </div>

                <div className="cuisine-section">
                    <h3 className="cuisine-title">Cuisine</h3>
                    <div className="cuisine-grid">
                        {cuisines.map((cuisine, index) => (
                            <div key={index} className="cuisine-item">
                                <div className="cuisine-image">
                                    <img src={cuisine.image || "/placeholder.svg"} alt={cuisine.name} />
                                </div>
                                <span className="cuisine-name">{cuisine.name}</span>
                            </div>
                        ))}
                        <button className="cuisine-nav-btn">
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
                </div>
            </div>
        </section>
    )
}

export default BestReviewedFood