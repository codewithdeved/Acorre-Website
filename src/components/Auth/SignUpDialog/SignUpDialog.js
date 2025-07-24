import { useState } from "react"
import "./SignUpDialog.css"
import { UserDatabase } from "../../../utils/userDatabase"

const SignUpDialog = ({ darkMode, onClose, onSignUp, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        userName: "",
        referCode: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

        if (!formData.userName.trim()) {
            newErrors.userName = "User name is required"
        } else if (formData.userName.length < 2) {
            newErrors.userName = "User name must be at least 2 characters"
        } else if (formData.userName.length > 50) {
            newErrors.userName = "User name must be less than 50 characters"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be at least 10 digits"
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        } else if (formData.password.length > 100) {
            newErrors.password = "Password must be less than 100 characters"
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms and conditions"
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
                const newUser = UserDatabase.createUser({
                    name: formData.userName.trim(),
                    email: formData.email.toLowerCase().trim(),
                    phone: formData.phone.trim(),
                    password: formData.password,
                    referCode: formData.referCode.trim() || null,
                    avatar: null,
                })

                const { password: _, ...userData } = newUser
                onSignUp(userData)
                setIsLoading(false)
            } catch (error) {
                if (error.message.includes("Email already exists")) {
                    setErrors({ email: "An account with this email already exists" })
                } else if (error.message.includes("Phone number already exists")) {
                    setErrors({ phone: "An account with this phone number already exists" })
                } else {
                    setErrors({ userName: "Registration failed. Please try again." })
                }
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
        <div className="signup-dialog-overlay" onClick={handleOverlayClick}>
            <div className="signup-dialog">
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
                    <h2 className="dialog-title">Sign Up</h2>

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-row">
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder="User Name *"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        className={errors.userName ? "error" : ""}
                                    />
                                </div>
                                {errors.userName && <span className="error-message">{errors.userName}</span>}
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper">
                                    <span className="input-icon">👥</span>
                                    <input
                                        type="text"
                                        name="referCode"
                                        placeholder="Refer Code (Optional)"
                                        value={formData.referCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <span className="input-icon">✉️</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={errors.email ? "error" : ""}
                                    />
                                </div>
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper phone-wrapper">
                                    <span className="country-code">🇺🇸 +1</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone *"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={errors.phone ? "error" : ""}
                                    />
                                </div>
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="form-row">
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

                            <div className="form-group">
                                <div className="input-wrapper password-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm Password *"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={errors.confirmPassword ? "error" : ""}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        <div className="terms-section">
                            <label className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                />
                                <span className="checkmark"></span>I agree with all the{" "}
                                <span className="terms-link">Terms & Conditions</span>
                            </label>
                            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                        </div>

                        <button type="submit" className="signup-btn" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="switch-auth">
                        Already have account?{" "}
                        <button onClick={onSwitchToLogin} className="switch-link">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpDialog