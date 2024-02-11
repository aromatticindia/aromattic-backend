const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true //make it enum
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Products', productSchema)