const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    city: {
        type: 'String',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})


const model = mongoose.model('City', citySchema)
module.exports = model