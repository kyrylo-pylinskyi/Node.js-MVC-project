//js
const express = require('express');
const {registerView, loginView, registerUser, loginUser } = require('../controllers/loginController');
const { protectedRoute } = require('../auth/protect');
const { dashboardView } = require('../controllers/dashboardController');
const router = express.Router();

//Register Page
router.get('/register', registerView);
router.post('/register', registerUser);

//Login Page
router.get('/login', loginView);
router.post('/login', loginUser);

//Dashboard Page
router.get('/dashboard', protectedRoute, dashboardView);

//Export Router
module.exports = router;