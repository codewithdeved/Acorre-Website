import { useState, useEffect } from "react"
import TopBar from "./components/TopBar/TopBar"
import Navbar from "./components/Navbar/Navbar"
import HeroSection from "./components/HeroSection/HeroSection"
import HighlightsForYou from "./components/HighlightsForYou/HighlightsForYou"
import TodaysTrend from "./components/TodaysTrend/TodaysTrend"
import BestReviewedFood from "./components/BestReviewedFood/BestReviewedFood"
import AcorreEcosystem from "./components/AcorreEcosystem/AcorreEcosystem"
import Footer from "./components/Footer/Footer"
import LoginDialog from "./components/Auth/LoginDialog/LoginDialog"
import SignUpDialog from "./components/Auth/SignUpDialog/SignUpDialog"
import ForgotPasswordDialog from "./components/Auth/ForgotPasswordDialog/ForgotPasswordDialog"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    const savedUser = localStorage.getItem("stackfood_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("stackfood_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("stackfood_user")
    }
  }, [user])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setShowLoginDialog(false)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const openLoginDialog = () => {
    setShowLoginDialog(true)
  }

  const closeAllDialogs = () => {
    setShowLoginDialog(false)
    setShowSignUpDialog(false)
    setShowForgotPasswordDialog(false)
  }

  const switchToSignUp = () => {
    setShowLoginDialog(false)
    setShowSignUpDialog(true)
  }

  const switchToLogin = () => {
    setShowSignUpDialog(false)
    setShowForgotPasswordDialog(false)
    setShowLoginDialog(true)
  }

  const switchToForgotPassword = () => {
    setShowLoginDialog(false)
    setShowForgotPasswordDialog(true)
  }

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <TopBar darkMode={darkMode} />
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        onLogin={openLoginDialog}
        onLogout={handleLogout}
      />
      <HeroSection darkMode={darkMode} />
      <HighlightsForYou darkMode={darkMode} />
      <TodaysTrend darkMode={darkMode} />
      <BestReviewedFood darkMode={darkMode} />
      <AcorreEcosystem darkMode={darkMode} />
      <Footer darkMode={darkMode} />

      {showLoginDialog && (
        <LoginDialog
          darkMode={darkMode}
          onClose={closeAllDialogs}
          onLogin={handleLogin}
          onSwitchToSignUp={switchToSignUp}
          onSwitchToForgotPassword={switchToForgotPassword}
        />
      )}

      {showSignUpDialog && (
        <SignUpDialog
          darkMode={darkMode}
          onClose={closeAllDialogs}
          onSignUp={handleLogin}
          onSwitchToLogin={switchToLogin}
        />
      )}

      {showForgotPasswordDialog && (
        <ForgotPasswordDialog darkMode={darkMode} onClose={closeAllDialogs} onBackToLogin={switchToLogin} />
      )}
    </div>
  )
}

export default App