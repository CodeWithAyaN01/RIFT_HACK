const express = require('express');
const router = express.Router();
const doctorController = require('../apis/doctor/doctorController');

// Define the endpoints and link them to the controller functions
router.post('/signup', doctorController.signup);
router.post('/login', doctorController.login);

module.exports = router;