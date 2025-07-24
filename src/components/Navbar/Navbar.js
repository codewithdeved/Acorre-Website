import { useState, useEffect } from "react"
import "./Navbar.css"
import logo from '../../assets/acorre_logo.png';

const Navbar = ({ darkMode, toggleDarkMode, user, onLogin, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDashboardOpen, setIsDashboardOpen] = useState(false)
    const [isCompactMode, setIsCompactMode] = useState(false)

    const navItems = [
        { name: "Home", active: true, icon: "🏠" },
        { name: "Categories", active: false, icon: "📂" },
        { name: "Cuisines", active: false, icon: "🍽️" },
        { name: "Restaurants", active: false, icon: "🏪" },
    ]

    const actionItems = [
        { name: "Search", icon: "🔍", action: () => console.log("Search") },
        { name: "Notifications", icon: "🔔", badge: "3", action: () => console.log("Notifications") },
        { name: "Cart", icon: "🛒", badge: "2", action: () => console.log("Cart") },
        { name: "Theme", icon: darkMode ? "☀️" : "🌙", action: toggleDarkMode },
    ]

    // Check for compact mode based on screen size
    useEffect(() => {
        const checkCompactMode = () => {
            const isSmallScreen = window.innerWidth <= 768
            const isShortScreen = window.innerHeight <= 600
            setIsCompactMode(isSmallScreen || isShortScreen)
        }

        checkCompactMode()
        window.addEventListener("resize", checkCompactMode)
        return () => window.removeEventListener("resize", checkCompactMode)
    }, [])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dashboard-dropdown") && !event.target.closest(".dashboard-btn")) {
                setIsDashboardOpen(false)
            }
            if (!event.target.closest(".navbar")) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobileMenuOpen])

    const toggleDashboard = () => {
        setIsDashboardOpen(!isDashboardOpen)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleNavClick = (item) => {
        console.log(`Navigate to ${item.name}`)
        setIsDashboardOpen(false)
        setIsMobileMenuOpen(false)
    }

    return (
        <nav className={`navbar ${isCompactMode ? "compact-mode" : ""}`}>
            <div className="navbar-container">
                <div className="navbar-brand">
                    <div className="logo">
                        <div className="logo-image-container">
                            <img src={logo} alt="Acorre" className="logo-image" />
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                {!isCompactMode && (
                    <>
                        <div className="navbar-menu">
                            <div className="nav-links">
                                {navItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className={`nav-link ${item.active ? "active" : ""}`}
                                        onClick={() => handleNavClick(item)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="navbar-actions">
                            <button className="action-btn search-btn" onClick={actionItems[0].action} title="Search">
                                <span className="icon">{actionItems[0].icon}</span>
                            </button>

                            <button className="action-btn notification-btn" onClick={actionItems[1].action} title="Notifications">
                                <span className="icon">{actionItems[1].icon}</span>
                                <span className="notification-badge">{actionItems[1].badge}</span>
                            </button>

                            <button className="action-btn cart-btn" onClick={actionItems[2].action} title="Cart">
                                <span className="icon">{actionItems[2].icon}</span>
                                <span className="cart-badge">{actionItems[2].badge}</span>
                            </button>

                            <button className="action-btn theme-toggle" onClick={actionItems[3].action} title="Toggle Theme">
                                <span className="icon">{actionItems[3].icon}</span>
                            </button>

                            {user ? (
                                <div className="user-info">
                                    <span className="user-name">Welcome, {user.name}</span>
                                    <button className="logout-btn" onClick={onLogout}>
                                        <span className="icon">🚪</span>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <button className="sign-in-btn" onClick={onLogin}>
                                    <span className="icon">👤</span>
                                    <span>Sign In</span>
                                </button>
                            )}
                        </div>
                    </>
                )}

                {/* Compact Mode Navigation */}
                {isCompactMode && (
                    <div className="compact-navbar">
                        <div className="dashboard-container">
                            <button
                                className={`dashboard-btn ${isDashboardOpen ? "active" : ""}`}
                                onClick={toggleDashboard}
                                title="Dashboard"
                            >
                                <span className="dashboard-icon">📊</span>
                                <span className="dashboard-text">Dashboard</span>
                                <span className={`dropdown-arrow ${isDashboardOpen ? "rotated" : ""}`}>▼</span>
                            </button>

                            {isDashboardOpen && (
                                <div className="dashboard-dropdown">
                                    <div className="dropdown-section">
                                        <h4 className="dropdown-title">Navigation</h4>
                                        <div className="dropdown-items">
                                            {navItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className={`dropdown-item ${item.active ? "active" : ""}`}
                                                    onClick={() => handleNavClick(item)}
                                                >
                                                    <span className="item-icon">{item.icon}</span>
                                                    <span className="item-text">{item.name}</span>
                                                    {item.active && <span className="active-indicator">●</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="dropdown-divider"></div>

                                    <div className="dropdown-section">
                                        <h4 className="dropdown-title">Quick Actions</h4>
                                        <div className="dropdown-items">
                                            {actionItems.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        item.action()
                                                        setIsDashboardOpen(false)
                                                    }}
                                                >
                                                    <span className="item-icon">{item.icon}</span>
                                                    <span className="item-text">{item.name}</span>
                                                    {item.badge && <span className="item-badge">{item.badge}</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="compact-user-section">
                            {user ? (
                                <div className="compact-user-info">
                                    <button className="user-menu-btn" onClick={toggleMobileMenu}>
                                        <span className="user-avatar">👤</span>
                                        <span className="user-name-compact">{user.name.split(" ")[0]}</span>
                                    </button>

                                    {isMobileMenuOpen && (
                                        <div className="user-dropdown">
                                            <div className="user-dropdown-header">
                                                <span className="user-full-name">{user.name}</span>
                                                <span className="user-email">{user.email}</span>
                                            </div>
                                            <button
                                                className="user-dropdown-item logout-item"
                                                onClick={() => {
                                                    onLogout()
                                                    setIsMobileMenuOpen(false)
                                                }}
                                            >
                                                <span className="icon">🚪</span>
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button className="compact-sign-in-btn" onClick={onLogin}>
                                    <span className="icon">👤</span>
                                    <span>Sign In</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay for dropdowns */}
            {(isDashboardOpen || isMobileMenuOpen) && isCompactMode && (
                <div
                    className="dropdown-overlay"
                    onClick={() => {
                        setIsDashboardOpen(false)
                        setIsMobileMenuOpen(false)
                    }}
                ></div>
            )}
        </nav>
    )
}

export default Navbar
