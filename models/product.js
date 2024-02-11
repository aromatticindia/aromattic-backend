const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        enum: ['MALE_CATEGORY', 'FEMALE_CATEGORY', 'UNISEX_CATEGORY'],
        required: true
    },
    productDescription: {
        type: String,
        required: true
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
    }
}, { timestamps: true })

module.exports = mongoose.model('Products', productSchema)