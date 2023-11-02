const express = require('express')
const router = express.Router()

const cartController = require('../controller/cartController')

router.post('/addcart', cartController.addToCart)
router.get('/getall', cartController.getAllCart)
router.get('/gettouser/:user', cartController.getCartToUser)

module.exports = router
