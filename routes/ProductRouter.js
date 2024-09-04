const express = require("express")
const router = express.Router()
const ProductController = require("../controllers/ProductController")
const {authMiddleWare} = require("../middleware/authMiddleware")

router.post('/create',ProductController.createProduct)
router.put('/update-product/:id',authMiddleWare,ProductController.updateProduct)
router.get('/get-details-product/:id',ProductController.getDetailsProduct)
router.delete('/delete-product/:id',ProductController.deleteProduct)
router.get('/get-all',ProductController.getAllProduct)


module.exports = router