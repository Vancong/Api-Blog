const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');

router.post('/register', userControllers.register);       
router.post('/login', userControllers.login);           
router.post('/refresh-token', userControllers.refreshToken); 
router.post('/logout', userControllers.logout);    

module.exports = router;
