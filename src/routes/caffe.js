const express = require('express')
const router = express.Router()

const caffeController = require('../controller/caffeController')
const middlewareController = require('../controller/middlewareController')

router.get('/', middlewareController.verifyToken, caffeController.getAll)
router.post('/createcoffe', middlewareController.verifyTokenAndAdminAuth, caffeController.createCaffe)
router.get('/category', caffeController.getCategoryCaffe)
router.get('/findtocategory/:category', caffeController.findToCategory)
router.get('/:name', caffeController.findToName)
router.delete('/delete/:idCoffe', middlewareController.verifyTokenAndAdminAuth, caffeController.deleteCaffe)
router.put('/edit/:idCoffe', middlewareController.verifyTokenAndAdminAuth, caffeController.editCaffe)
router.get('/detail/:idCoffe', middlewareController.verifyToken, caffeController.getOneCaffe)

module.exports = router
