var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { protect } = require('../Middlewares/verifyToken')

router.route('/signup').post(userController.signupPost)
router.route('/login').post(userController.loginPost)
router.route('/google').get(userController.google)
router.route('/city').post(protect, userController.cityAdd)
router.route('/cities').get(protect, userController.fetchCities)

module.exports = router;
