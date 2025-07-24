"use client"

import { useState } from "react"
import "./LoginDialog.css"
import { UserDatabase } from "../../../utils/userDatabase"

const LoginDialog = ({ darkMode, onClose, onLogin, onSwitchToSignUp, onSwitchToForgotPassword }) => {
    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
        rememberMe: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.emailOrPhone.trim()) {
            newErrors.emailOrPhone = "Email or phone is required"
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)

        setTimeout(() => {
            try {
                const userData = UserDatabase.authenticateUser(formData.emailOrPhone, formData.password)
                onLogin(userData)
                setIsLoading(false)
            } catch (error) {
                if (error.message.includes("No account found")) {
                    setErrors({ emailOrPhone: error.message })
                } else if (error.message.includes("Incorrect password")) {
                    setErrors({ password: error.message })
                } else {
                    setErrors({ emailOrPhone: "Login failed. Please try again." })
                }
                setIsLoading(false)
            }
        }, 1500)
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="login-dialog-overlay" onClick={handleOverlayClick}>
            <div className="login-dialog">
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>

                <div className="dialog-header">
                    <div className="logo">
                        <span className="logo-icon">🍽️</span>
                        <span className="logo-text">ACORRE</span>
                    </div>
                </div>

                <div className="dialog-content">
                    <h2 className="dialog-title">Login</h2>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="emailOrPhone"
                                    placeholder="Email or Phone"
                                    value={formData.emailOrPhone}
                                    onChange={handleInputChange}
                                    className={errors.emailOrPhone ? "error" : ""}
                                />
                            </div>
                            {errors.emailOrPhone && <span className="error-message">{errors.emailOrPhone}</span>}
                        </div>

                        <div className="form-group">
                            <div className="input-wrapper password-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password *"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={errors.password ? "error" : ""}
                                />
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-options">
                            <label className="checkbox-wrapper">
                                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
                                <span className="checkmark"></span>
                                Remember me
                            </label>

                            <button type="button" className="forgot-password-link" onClick={onSwitchToForgotPassword}>
                                Forgot Password?
                            </button>
                        </div>

                        <div className="terms-text">
                            * I agree with all the <span className="terms-link">Terms & Conditions</span>
                        </div>

                        <button type="submit" className="login-btn" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* <div className="demo-credentials">
                        <p className="demo-title">Demo Credentials:</p>
                        <div className="demo-list">
                            <div>📧 john@example.com | 🔑 123456</div>
                            <div>📧 jane@example.com | 🔑 password</div>
                            <div>📧 admin@stackfood.com | 🔑 admin123</div>
                        </div>
                    </div> */}

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="social-login">
                        <button className="google-btn">
                            <span className="google-icon">🌐</span>
                            Continue with Google
                        </button>

                        <button className="otp-btn">
                            <span className="otp-icon">📱</span>
                            OTP Sign in
                        </button>
                    </div>

                    <div className="switch-auth">
                        Don't have account?{" "}
                        <button onClick={onSwitchToSignUp} className="switch-link">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginDialog