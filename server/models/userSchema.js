const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required:false,
    },
    password: {
        type: String,
        required: false,
    }, googleId: {
        type: String,
        unique: true,
        required: false
    },
},
    {
        timestamps: true
    }
)

const model = mongoose.model('User', userSchema)
module.exports = model