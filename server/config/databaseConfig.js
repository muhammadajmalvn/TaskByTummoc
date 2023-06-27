const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config()

module.exports = () => {
    // const uri = process.env.MONGO_DB_URI
    const uri = 'mongodb://localhost:27017/Tummoc'
    
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB"))
        .catch(error => console.log("Error connecting to MongoDB", error));
}

