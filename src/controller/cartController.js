const { Cart, Caffe } = require('../models')

const cartController = {
    addToCart: async (req, res) => {
        try {
            const newCart = new Cart({
                soluong: req.body.soluong,
                size: req.body.size,
                price: req.body.price,
                sdt: req.body.sdt,
                address: req.body.address,
                user: req.body.user,
                coffe: req.body.coffe,
            })
            const coffe = await Caffe.findById(req.body.coffe)
            await coffe.updateOne({ quantity: coffe.quantity - req.body.soluong })
            const cart = await newCart.save()
            return res.status(200).json(cart)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getAllCart: async (req, res) => {
        try {
            const cart = await Cart.find().populate('coffe user')
            return res.status(200).json(cart)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getCartToUser: async (req, res) => {
        try {
            const cart = await Cart.find({ user: req.params.user }).populate('coffe user')
            return res.status(200).json(cart)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = cartController
