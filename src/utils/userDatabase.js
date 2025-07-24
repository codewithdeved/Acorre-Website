export class UserDatabase {
    static USERS_KEY = "stackfood_users"
    static OTPS_KEY = "stackfood_otps"

    static initializeDatabase() {
        const users = this.getAllUsers()
        if (users.length === 0) {
            const demoUsers = [
                {
                    id: 1,
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "+1234567890",
                    password: "123456",
                    avatar: null,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    email: "jane@example.com",
                    phone: "+1987654321",
                    password: "password",
                    avatar: null,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                },
                {
                    id: 3,
                    name: "Admin User",
                    email: "admin@stackfood.com",
                    phone: "+1555000000",
                    password: "admin123",
                    avatar: null,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                },
                {
                    id: 4,
                    name: "Sarah Wilson",
                    email: "sarah@gmail.com",
                    phone: "+1444555666",
                    password: "sarah2024",
                    avatar: null,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                },
                {
                    id: 5,
                    name: "Mike Johnson",
                    email: "mike.johnson@yahoo.com",
                    phone: "+1777888999",
                    password: "mikepass",
                    avatar: null,
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                },
            ]
            localStorage.setItem(this.USERS_KEY, JSON.stringify(demoUsers))
            return demoUsers
        }
        return users
    }

    static getAllUsers() {
        return JSON.parse(localStorage.getItem(this.USERS_KEY) || "[]")
    }

    static findUser(emailOrPhone) {
        const users = this.getAllUsers()
        return users.find((u) => u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone)
    }

    static findUserByEmail(email) {
        const users = this.getAllUsers()
        return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    }

    static findUserByPhone(phone) {
        const users = this.getAllUsers()
        return users.find((u) => u.phone === phone)
    }

    static createUser(userData) {
        const users = this.getAllUsers()

        if (this.findUserByEmail(userData.email)) {
            throw new Error("Email already exists")
        }

        if (this.findUserByPhone(userData.phone)) {
            throw new Error("Phone number already exists")
        }

        const newUser = {
            id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
            ...userData,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
        }

        users.push(newUser)
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
        return newUser
    }

    static updateUser(userId, updates) {
        const users = this.getAllUsers()
        const userIndex = users.findIndex((u) => u.id === userId)

        if (userIndex === -1) {
            throw new Error("User not found")
        }

        users[userIndex] = { ...users[userIndex], ...updates }
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
        return users[userIndex]
    }

    static authenticateUser(emailOrPhone, password) {
        const user = this.findUser(emailOrPhone)

        if (!user) {
            throw new Error("No account found with this email or phone number")
        }

        if (user.password !== password) {
            throw new Error("Incorrect password")
        }

        this.updateUser(user.id, { lastLogin: new Date().toISOString() })

        const { password: _, ...userData } = user
        return { ...userData, lastLogin: new Date().toISOString() }
    }

    static generateOTP(email) {
        const user = this.findUserByEmail(email)

        if (!user) {
            throw new Error("No account found with this email address")
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpData = {
            email: email,
            otp: otp,
            userId: user.id,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
            createdAt: new Date().toISOString(),
        }

        const otps = JSON.parse(localStorage.getItem(this.OTPS_KEY) || "[]")

        const filteredOtps = otps.filter((o) => o.email !== email)
        filteredOtps.push(otpData)

        localStorage.setItem(this.OTPS_KEY, JSON.stringify(filteredOtps))

        console.log(`OTP generated for ${email}: ${otp}`)

        return otp
    }

    static verifyOTP(email, otp) {
        const otps = JSON.parse(localStorage.getItem(this.OTPS_KEY) || "[]")
        const otpData = otps.find((o) => o.email === email && o.otp === otp)

        if (!otpData) {
            throw new Error("Invalid OTP")
        }

        if (new Date() > new Date(otpData.expiresAt)) {
            throw new Error("OTP has expired")
        }

        const filteredOtps = otps.filter((o) => !(o.email === email && o.otp === otp))
        localStorage.setItem(this.OTPS_KEY, JSON.stringify(filteredOtps))

        return true
    }

    static getUserStats() {
        const users = this.getAllUsers()
        return {
            totalUsers: users.length,
            recentUsers: users.filter((u) => {
                const createdDate = new Date(u.createdAt)
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                return createdDate > weekAgo
            }).length,
            activeUsers: users.filter((u) => u.lastLogin).length,
        }
    }

    static clearDatabase() {
        localStorage.removeItem(this.USERS_KEY)
        localStorage.removeItem(this.OTPS_KEY)
    }

    static exportUsers() {
        return {
            users: this.getAllUsers(),
            otps: JSON.parse(localStorage.getItem(this.OTPS_KEY) || "[]"),
            stats: this.getUserStats(),
        }
    }
}

UserDatabase.initializeDatabase()