import WhatsOnYourMind from "./WhatsOnYourMind/WhatsOnYourMind"
import ItemsCarousel from "./ItemsCarousel/ItemsCarousel"
import "./HeroSection.css"

const HeroSection = ({ darkMode }) => {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <WhatsOnYourMind darkMode={darkMode} />
                <ItemsCarousel darkMode={darkMode} />
            </div>
        </section>
    )
}

export default HeroSection