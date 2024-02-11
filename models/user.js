const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    googleId: {
		type: String,
	},
    wishlist: [{ type: ObjectId, ref: 'Products' }],
    orderHistory: [{ type: ObjectId, ref: 'Orders' }],
}, { timestamps: true })

module.exports = mongoose.model('Users', userSchema)