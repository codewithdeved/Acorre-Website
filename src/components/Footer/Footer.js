import { useState } from "react"
import "./Footer.css"

const Footer = ({ darkMode }) => {
    const [email, setEmail] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email.trim()) {
            setIsSubscribed(true)
            setEmail("")
            setTimeout(() => setIsSubscribed(false), 3000)
        }
    }

    const footerLinks = {
        about: [
            { name: "About Us", href: "#" },
            { name: "Categories", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Press", href: "#" },
            { name: "Blog", href: "#" },
        ],
        quickLinks: [
            { name: "Refund Policy", href: "#" },
            { name: "Shipping Policy", href: "#" },
            { name: "Cancellation Policy", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms & Conditions", href: "#" },
        ],
        forUsers: [
            { name: "Login", href: "#" },
            { name: "Live Chat", href: "#" },
            { name: "My Orders", href: "#" },
            { name: "Help & Support", href: "#" },
            { name: "Track Order", href: "#" },
        ],
    }

    const socialLinks = [
        { name: "Instagram", icon: "📷", href: "#", color: "#E4405F" },
        { name: "Facebook", icon: "📘", href: "#", color: "#1877F2" },
        { name: "Twitter", icon: "🐦", href: "#", color: "#1DA1F2" },
        { name: "LinkedIn", icon: "💼", href: "#", color: "#0A66C2" },
        { name: "Pinterest", icon: "📌", href: "#", color: "#BD081C" },
    ]

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-main">
                        <div className="footer-brand">
                            <div className="brand-logo">
                                <span className="logo-icon">🍽️</span>
                                <span className="logo-text">ACORRE</span>
                            </div>
                            <p className="brand-description">
                                Your ultimate destination for premium products across all categories. From gourmet food to cutting-edge
                                electronics, we deliver excellence to your doorstep.
                            </p>

                            <div className="newsletter-section">
                                <h4 className="newsletter-title">Subscribe to our newsletter</h4>
                                <p className="newsletter-subtitle">Get latest updates and exclusive offers</p>
                                <form onSubmit={handleSubscribe} className="newsletter-form">
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            placeholder="Your Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="newsletter-input"
                                            required
                                        />
                                        <button type="submit" className="subscribe-btn">
                                            {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="social-links">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="social-link"
                                        style={{ "--social-color": social.color }}
                                        aria-label={social.name}
                                    >
                                        <span className="social-icon">{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="footer-links">
                            <div className="link-column">
                                <h4 className="column-title">About</h4>
                                <ul className="link-list">
                                    {footerLinks.about.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href} className="footer-link">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="link-column">
                                <h4 className="column-title">Quick Links</h4>
                                <ul className="link-list">
                                    {footerLinks.quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href} className="footer-link">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="link-column">
                                <h4 className="column-title">For Users</h4>
                                <ul className="link-list">
                                    {footerLinks.forUsers.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href} className="footer-link">
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <div className="footer-divider"></div>
                        <div className="footer-bottom-content">
                            <div className="copyright">
                                <p>&copy; 2025 StackFood. All rights reserved.</p>
                            </div>
                            <div className="footer-meta">
                                <span className="made-with">Made with ❤️ for amazing customers</span>
                                <div className="payment-methods">
                                    <span className="payment-icon">💳</span>
                                    <span className="payment-icon">🏦</span>
                                    <span className="payment-icon">📱</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer