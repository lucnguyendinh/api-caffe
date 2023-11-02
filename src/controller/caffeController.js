const cloudinary = require('../utils/cloudinary')
const { Caffe } = require('../models')

const caffeController = {
    createCaffe: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.body.img, {
                folder: 'imagesbook',
            })
            const newCaffe = new Caffe({
                name: req.body.name,
                category: req.body.category,
                img: result.secure_url,
                quantity: req.body.quantity,
                des: req.body.des,
                price: req.body.price,
            })
            const caffe = await newCaffe.save()
            return res.status(200).json(caffe)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getAll: async (req, res) => {
        try {
            const allCaffe = await Caffe.find()
            return res.status(200).json(allCaffe)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    findToName: async (req, res) => {
        try {
            const caffe = await Caffe.find({ name: { $regex: req.params.name } })
            return res.status(200).json(caffe)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    deleteCaffe: async (req, res) => {
        try {
            await Caffe.findByIdAndDelete(req.params.idCoffe)
            return res.status(200).json('deleted!!!')
        } catch (err) {
            res.status(500).json(err)
        }
    },
    editCaffe: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.body.img, {
                folder: 'imagesbook',
            })
            await Caffe.findByIdAndUpdate(req.params.idCoffe, {
                name: req.body.name,
                category: req.body.category,
                img: result.secure_url,
                quantity: req.body.quantity,
                des: req.body.des,
                price: req.body.price,
            })
            return res.status(200).json('edited!!!')
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getOneCaffe: async (req, res) => {
        try {
            const caffe = await Caffe.findById(req.params.idCoffe)
            return res.status(200).json(caffe)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getCategoryCaffe: async (req, res) => {
        try {
            const newA = []
            const category = await Caffe.find().select('category -_id')
            category.forEach((c) => newA.push(c.category))
            const final = Array.from(new Set(newA))
            return res.status(200).json(final)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    findToCategory: async (req, res) => {
        try {
            if (req.params.category == 'all') {
                const caffe = await Caffe.find()
                return res.status(200).json(caffe)
            }
            const caffeByCategory = await Caffe.find({ category: req.params.category })
            return res.status(200).json(caffeByCategory)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = caffeController
