import mongoose from "mongoose";

const productSchema = mongoose.Schema({

    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    }
},
    {
        timestamps: true
    })


const Product = mongoose.model('product', productSchema)


export default Product