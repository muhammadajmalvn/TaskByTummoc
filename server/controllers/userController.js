const userSchema = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()
const generateToken = require('../utils/generateToken')
const citySchema = require('../models/citySchema')
const mongoose = require('mongoose');

exports.signupPost = async (req, res) => {
    try {
        let details = {
            firstName, lastName, email, phone, password
        } = req.body

        details.password = await bcrypt.hash(req.body.password, 10)

        userSchema.findOne({ email: details.email }).then((userData) => {
            if (userData) {
                console.log("user already exists");
                res.status(400).json("User Already Exists")
            } else {
                userSchema.create(details).then((result) => {
                    let details = {
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                    }
                    res.status(201).json(details)
                    console.log(result);
                }).catch((err) => {
                    res.status(400).json({ message: 'err' })
                    console.log("Error", err);
                })
            }
        })
    } catch (error) {
        res.json(error.message)
    }
}

exports.loginPost = async (req, res) => {
    try {
        await userSchema.findOne({ email: req.body.email }).then((userData) => {
            if (userData) {
                bcrypt.compare(req.body.password, userData.password, function (err, response) {
                    if (response) {
                        let details = {
                            id: userData.id,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email,
                            phone: userData.phone,
                            token: generateToken(userData.id),
                        }
                        res.status(200).json(details)
                    } else {
                        res.status(401).json("Incorrect Password")
                    }
                })

            } else {
                res.status(400).json("User Does Not Exist")
            }
        })
    } catch (err) {
        console.log("Error: " + err);
    }
}

exports.google = async (req, res) => {
    try {
        const data = req.headers.authorization
        let result = data.split(' ')[1]
        result = jwt.decode(result)
        const email = result.email
        const firstName = result.given_name
        const lastName = result.family_name
        const googleId = result.sub

        let userData = await userSchema.findOne({ email: email })

        if (!userData) {
            userData = await userSchema.create({ ...req.body, email, firstName, lastName, googleId })
        }
        let details = {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            token: generateToken(userData.id),
        }
        res.status(200).json(details)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.cityAdd = async (req, res) => {
    try {
        const city = await citySchema.findOne({ city: req.body.cityData.city })
        if (city) {
            res.status(403).json("City already exists")
        } else {
            await citySchema.create(req.body.cityData)
            res.status(201).json("Data added successfully")
        }
    } catch (error) {
        console.log(error);
    }
}

exports.fetchCities = async (req, res) => {
    try {
        const data = await userSchema.aggregate(
            [
                {
                    '$match': {
                        '_id': new mongoose.Types.ObjectId(req.query.id)
                    }
                },
                {
                    '$lookup': {
                        'from': 'cities',
                        'localField': '_id',
                        'foreignField': 'userId',
                        'as': 'result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result'
                    }
                }
            ]
        )
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json('error fetching city data')
    }
}