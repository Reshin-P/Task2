import express from 'express'
import { admin, protectUser } from '../Middileware/AuthMiddleware.js'
import {
    addProduct,
    updateProduct,
    deleteProduct,
    allProductsForUser,
    allProducts
} from '../Controllers/ProductControllers.js'

const router = express.Router()



router.route('/:id').put(admin, updateProduct)
router.route('/:id').delete(admin, deleteProduct)
router.route('/').post(admin, addProduct)
router.route('/').get(protectUser, allProductsForUser)
router.route('/listall').get(admin, allProducts)





export default router