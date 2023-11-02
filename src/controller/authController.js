const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Token } = require('../models')

const authController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })
            //Save to db
            const user = await newUser.save()
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    generateAccessToken: (user) => {
        return jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '30s' },
        )
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '365d' },
        )
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })

            if (!user) {
                return res.status(404).json('Wrong name!')
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                return res.status(404).json('Wrong password!')
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)

                const token = await Token.findOneAndUpdate(
                    { user: user._id },
                    {
                        $push: { refreshTokens: refreshToken },
                    },
                )
                if (!token) {
                    const newToken = new Token({
                        refreshTokens: refreshToken,
                        user: user._id,
                    })
                    //Save to db
                    await newToken.save()
                }
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 31536000,
                    secure: false, //deloy doi thanh true
                    path: '/',
                    sameSite: 'strict',
                })
                return res.status(200).json({ user, accessToken })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json("You're not authenticated!")
        }
        const token = await Token.findOne({ user: req.body.user })
        if (!token?.refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid')
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) {
                return res.status(400).json(err)
            }
            await token.updateOne({
                $pull: { refreshTokens: refreshToken },
            })
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)

            await token.updateOne({
                $push: { refreshTokens: newRefreshToken },
            })
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 31536000,
                secure: false, //deloy doi thanh true
                path: '/',
                sameSite: 'strict',
            })
            return res.status(200).json({ accessToken: newAccessToken })
        })
    },
    //LogOUt
    logout: async (req, res) => {
        await Token.findOneAndUpdate(
            { refreshTokens: req.cookies.refreshToken },
            {
                $pull: { refreshTokens: req.cookies.refreshToken },
            },
        )
        res.clearCookie('refreshToken')
        return res.status(200).json('Logged out!!')
    },
}

module.exports = authController
