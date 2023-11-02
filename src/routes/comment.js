const express = require('express')
const router = express.Router()

const commentController = require('../controller/commentController')
const middlewareController = require('../controller/middlewareController')

router.post('/comment', middlewareController.verifyToken, commentController.comment)
router.get('/:idCoffe', commentController.getComment)

module.exports = router
