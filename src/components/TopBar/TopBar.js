import { useState } from "react"
import "./TopBar.css"

const TopBar = ({ darkMode }) => {
    
    const [selectedLanguage, setSelectedLanguage] = useState("English")
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
    const [showUserDropdown, setShowUserDropdown] = useState(false)

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ar", name: "عربي", flag: "🇸🇦" },
        { code: "es", name: "Spanish", flag: "🇪🇸" },
        { code: "bn", name: "Bengali", flag: "🇧🇩" },
    ]

    return (
        <div className="topbar">
            <div className="topbar-container">
                <div className="location-section">
                    <span className="location-icon">📍</span>
                    <div className="location-info">
                        <span className="location-label">Your Location:</span>
                        <span className="location-text">National Haway road main bazar Nasai Nasai, Overseas Socie...</span>
                    </div>
                </div>

                <div className="topbar-actions">
                    <div className="language-selector">
                        <button className="language-btn" onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
                            <span className="flag">🇺🇸</span>
                            <span>{selectedLanguage}</span>
                            <span className="dropdown-arrow">▼</span>
                        </button>

                        {showLanguageDropdown && (
                            <div className="language-dropdown">
                                {languages.map((lang) => (
                                    <div
                                        key={lang.code}
                                        className="language-option"
                                        onClick={() => {
                                            setSelectedLanguage(lang.name)
                                            setShowLanguageDropdown(false)
                                        }}
                                    >
                                        <span className="flag">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="user-section">
                        <button className="user-btn" onClick={() => setShowUserDropdown(!showUserDropdown)}>
                            <span className="user-icon">👤</span>
                            <span>Join Us</span>
                            <span className="dropdown-arrow">▼</span>
                        </button>

                        {showUserDropdown && (
                            <div className="user-dropdown">
                                <div className="user-option">Become a Restaurant</div>
                                <div className="user-option">Become a Delivery Man</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar