import { useState } from "react"
import "./ForgotPasswordDialog.css"
import { UserDatabase } from "../../../utils/userDatabase"

const ForgotPasswordDialog = ({ darkMode, onClose, onBackToLogin }) => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleInputChange = (e) => {
        setEmail(e.target.value)
        if (error) {
            setError("")
        }
    }

    const validateEmail = () => {
        if (!email.trim()) {
            setError("Email is required")
            return false
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address")
            return false
        }
        if (email.length > 100) {
            setError("Email address is too long")
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail()) return

        setIsLoading(true)

        // Simulate API call delay
        setTimeout(() => {
            try {
                const otp = UserDatabase.generateOTP(email)
                console.log(`Password recovery OTP for ${email}: ${otp}`)
                setIsSuccess(true)
                setIsLoading(false)
            } catch (error) {
                setError(error.message)
                setIsLoading(false)
            }
        }, 2000)
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="forgot-password-dialog-overlay" onClick={handleOverlayClick}>
            <div className="forgot-password-dialog">
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>

                <div className="dialog-header">
                    <div className="logo-icon-large">🍽️</div>
                </div>

                <div className="dialog-content">
                    <h2 className="dialog-title">Forgot Your Password</h2>

                    {!isSuccess ? (
                        <>
                            <p className="dialog-description">
                                Please enter the registered email where you want to send your password recovery OTP.
                            </p>

                            <form onSubmit={handleSubmit} className="forgot-password-form">
                                <div className="form-group">
                                    <div className="input-wrapper">
                                        <span className="input-icon">✉️</span>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="E-mail *"
                                            value={email}
                                            onChange={handleInputChange}
                                            className={error ? "error" : ""}
                                        />
                                    </div>
                                    {error && <span className="error-message">{error}</span>}
                                </div>

                                <button type="submit" className="request-otp-btn" disabled={isLoading}>
                                    {isLoading ? "Sending OTP..." : "Request OTP"}
                                </button>
                            </form>

                            <div className="divider">
                                <span>or</span>
                            </div>

                            <div className="back-to-login">
                                Back to{" "}
                                <button onClick={onBackToLogin} className="login-link">
                                    Log In
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="success-message">
                            <div className="success-icon">✅</div>
                            <h3>OTP Sent Successfully!</h3>
                            <p>
                                We've sent a password recovery OTP to your email address. Please check your inbox and follow the
                                instructions to reset your password.
                            </p>
                            <button onClick={onBackToLogin} className="back-to-login-btn">
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordDialog