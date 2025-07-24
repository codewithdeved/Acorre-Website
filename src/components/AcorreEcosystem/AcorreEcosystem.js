import { useState } from "react"
import "./AcorreEcosystem.css"

import image1 from '../../assets/acorre-community-logo.jpg'
import image2 from '../../assets/acorre-developer-logo.jpg'
import image3 from '../../assets/acorre-partner-icon.png'
import image4 from '../../assets/acorre-business-icon.png'

const AcorreEcosystem = ({ darkMode }) => {
    const [activeCard, setActiveCard] = useState(null)

    const ecosystemServices = [
        {
            id: "business",
            title: "Acorre Business",
            subtitle: "Enterprise Solutions",
            description:
                "Comprehensive business management platform with advanced analytics, team collaboration, and enterprise-grade security features.",
            image: image1,
            color: "#1dd1a1",
            gradient: "linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%)",
            features: ["Advanced Analytics", "Team Management", "Enterprise Security", "Custom Integrations"],
            cta: "Explore Business",
            badge: "Enterprise",
        },
        {
            id: "partner",
            title: "Acorre Partner",
            subtitle: "Partnership Network",
            description:
                "Join our thriving partner ecosystem and unlock new revenue streams through our comprehensive partner program and marketplace.",
            image: image2,
            color: "#00d2d3",
            gradient: "linear-gradient(135deg, #00d2d3 0%, #01a3a4 100%)",
            features: ["Revenue Sharing", "Marketing Support", "Technical Resources", "Partner Portal"],
            cta: "Become Partner",
            badge: "Network",
        },
        {
            id: "developer",
            title: "Acorre Developer",
            subtitle: "Development Platform",
            description:
                "Powerful APIs, SDKs, and development tools to build, integrate, and scale your applications with the Acorre ecosystem.",
            image: image3,
            color: "#f1c40f",
            gradient: "linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)",
            features: ["REST APIs", "SDKs & Libraries", "Documentation", "Developer Console"],
            cta: "Start Building",
            badge: "API",
        },
        {
            id: "community",
            title: "Acorre Community",
            subtitle: "Global Network",
            description:
                "Connect with thousands of users, share knowledge, get support, and contribute to the future of the Acorre platform.",
            image: image4,
            color: "#9333ea",
            gradient: "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)",
            features: ["Community Forums", "Knowledge Base", "Events & Meetups", "Expert Support"],
            cta: "Join Community",
            badge: "Global",
        },
    ]

    const handleCardHover = (cardId) => {
        setActiveCard(cardId)
    }

    const handleCardLeave = () => {
        setActiveCard(null)
    }

    return (
        <section className="acorre-ecosystem-section">
            <div className="container">
                <div className="section-header">
                    <div className="header-content">
                        <h2 className="section-title">The Acorre Ecosystem</h2>
                        <p className="section-subtitle">
                            Discover our comprehensive suite of platforms designed to power your business, partnerships, development,
                            and community engagement
                        </p>
                    </div>
                    <div className="ecosystem-stats">
                        <div className="stat-item">
                            <span className="stat-number">50K+</span>
                            <span className="stat-label">Active Users</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1K+</span>
                            <span className="stat-label">Partners</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">99.9%</span>
                            <span className="stat-label">Uptime</span>
                        </div>
                    </div>
                </div>

                <div className="ecosystem-grid">
                    {ecosystemServices.map((service, index) => (
                        <div
                            key={service.id}
                            className={`ecosystem-card ${activeCard === service.id ? "active" : ""}`}
                            onMouseEnter={() => handleCardHover(service.id)}
                            onMouseLeave={handleCardLeave}
                            style={{ "--service-color": service.color, "--service-gradient": service.gradient }}
                        >
                            <div className="card-header">
                                <div className="service-image-container">
                                    <img src={service.image || "/placeholder.svg"} alt={service.title} className="service-image" />
                                </div>
                                <div className="service-badge" style={{ backgroundColor: service.color }}>
                                    {service.badge}
                                </div>
                            </div>

                            <div className="card-content">
                                <div className="service-info">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-subtitle">{service.subtitle}</p>
                                    <p className="service-description">{service.description}</p>
                                </div>

                                <div className="service-features">
                                    <h4 className="features-title">Key Features</h4>
                                    <ul className="features-list">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="feature-item">
                                                <span className="feature-icon">✓</span>
                                                <span className="feature-text">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="service-cta" style={{ background: service.gradient }}>
                                    {service.cta}
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

                            <div className="card-background-pattern"></div>
                        </div>
                    ))}
                </div>

                <div className="ecosystem-footer">
                    <div className="integration-showcase">
                        <h3 className="integration-title">Seamless Integration Across All Platforms</h3>
                        <p className="integration-description">
                            All Acorre services work together seamlessly, providing a unified experience across business operations,
                            partner management, development workflows, and community engagement.
                        </p>
                        <div className="integration-flow">
                            <div className="flow-item">
                                <div className="flow-icon" style={{ backgroundColor: "#1dd1a1" }}>
                                    💼
                                </div>
                                <span className="flow-label">Business</span>
                            </div>
                            <div className="flow-connector">⟷</div>
                            <div className="flow-item">
                                <div className="flow-icon" style={{ backgroundColor: "#00d2d3" }}>
                                    🤝
                                </div>
                                <span className="flow-label">Partners</span>
                            </div>
                            <div className="flow-connector">⟷</div>
                            <div className="flow-item">
                                <div className="flow-icon" style={{ backgroundColor: "#f1c40f" }}>
                                    ⚡
                                </div>
                                <span className="flow-label">Developers</span>
                            </div>
                            <div className="flow-connector">⟷</div>
                            <div className="flow-item">
                                <div className="flow-icon" style={{ backgroundColor: "#9333ea" }}>
                                    👥
                                </div>
                                <span className="flow-label">Community</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AcorreEcosystem