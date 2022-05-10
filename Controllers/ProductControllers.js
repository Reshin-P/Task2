import asyncHandler from 'express-async-handler'
import Product from '../DatabaseModel/ProductModel.js';



//@desc  Add -Prduct
//@route POST /api/product/
//@access Private



const addProduct = asyncHandler(async (req, res) => {

    const { productname, price } = req.body
    const product = await Product.create({
        productname: productname,
        price: price,
        createdBy: req.admin._id
    })
    if (product) {

        res.status(200).json({ message: "product added", data: product })
    }
})




//@desc  update -Prduct
//@route PUT /api/product/
//@access Private


const updateProduct = asyncHandler(async (req, res) => {

    let product = await Product.findById(req.params.id)

    if (product) {

        product.productname = req.body.productname
        product.price = req.body.price
        await product.save()
        res.status(200).json({ message: "product updated", data: product })
    } else {

        throw new Error("no product found")
    }
})




//@desc  Delete -Prduct
//@route DELETE /api/product/
//@access Private


const deleteProduct = asyncHandler(async (req, res) => {

    let product = await Product.findById(req.params.id)

    if (product) {

        product.remove()
        res.status(200).json({ message: "product removed" })

    } else {

        throw new Error("no product found")
    }
})




//@desc  All Product For User 
//@route GET /api/product/
//@access Private


const allProductsForUser = asyncHandler(async (req, res) => {

    try {
        const product = await Product.find({ isActive: true })

        if (product.length === 0) {

            res.json("no product found")

        } else {

            res.json(product).status(200)
        }
    } catch (error) {

        throw new Error("something went wrong")
    }

})


//@desc  All product for Admin
//@route POST /api/product/listall
//@access Private

const allProducts = asyncHandler(async (req, res) => {

    try {
        const product = await Product.find()

        if (product.length === 0) {

            res.json("no product found")

        } else {

            res.json(product).status(200)
        }
    } catch (error) {

        throw new Error("something went wrong")
    }

})



export {
    addProduct,
    updateProduct,
    deleteProduct,
    allProductsForUser,
    allProducts
}