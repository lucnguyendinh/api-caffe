const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

const caffeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        category: {
            type: String,
        },
        img: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        des: {
            type: String,
        },
        price: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
)

const cartSchema = new mongoose.Schema(
    {
        soluong: {
            type: Number,
        },
        size: {
            type: String,
        },
        price: {
            type: Number,
        },
        sdt: {
            type: Number,
        },
        address: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        coffe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Caffe',
        },
    },
    {
        timestamps: true,
    },
)

const commentSchema = new mongoose.Schema({
    idCoffe: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    },
})

//Token
const tokenSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
    },
    refreshTokens: [
        {
            type: String,
            default: [],
        },
    ],
})

let User = mongoose.model('User', userSchema)
let Caffe = mongoose.model('Caffe', caffeSchema)
let Cart = mongoose.model('Cart', cartSchema)
let Comment = mongoose.model('Comment', commentSchema)
let Token = mongoose.model('Token', tokenSchema)

module.exports = { User, Caffe, Cart, Comment, Token }
