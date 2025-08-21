const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user.controllers');
const {authUserOrAdmin, authUser} =require('../middleware/auth.middeware')

router.get('/me', authUser, userControllers.getMe);

router.patch('/:userId',authUser, authUserOrAdmin, userControllers.update);

router.patch('/me/password', authUser, userControllers.changePassword);

module.exports=router;