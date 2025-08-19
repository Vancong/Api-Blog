const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user.controllers');
const {authUserOrAdmin, authUser} =require('../middleware/auth.middeware')

router.post('/register', userControllers.register);

router.post('/login',userControllers.login);

router.post('/refresh-token',userControllers.refreshToken);

router.get('/logout',userControllers.logout);

router.patch('/update/:userId',authUserOrAdmin ,userControllers.update);

router.patch('/change-password', authUser,userControllers.changePassword)

module.exports=router;