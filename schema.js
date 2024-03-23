const mongoose = require('mongoose'); 
  
const userSchema = new mongoose.Schema({ 
    fullName: {
        type: String, 
        require: true
    },
    email: {
        type: String, 
        require: true
    },
    contactNumber: {
        type: String, 
        require: true
    },
    address: {
        type: String, 
        require: true
    },
    gender: {
        type: String
    },
    password: {
        type: String, 
        require: true
    },  
    wishlist: [{
        productId: {
            type: String
        },
        productName: {
            type: String
        }, 
        productLink: {
            type: String
        },
        available: {
            type: Boolean
        }, 
    }], 
    order: [{
        orderId: {
            type: String
        }, 
        productId: {
            type: String
        },
        productName: {
            type: String
        },
        productLink: {
            type: String
        },
        orderDate: {
            type: String
        },
        payment: {
            type: String
        }
    }]
}) 

const User = new mongoose.model("User", userSchema);
module.exports = { User };
