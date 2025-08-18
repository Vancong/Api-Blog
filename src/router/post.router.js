const express=require('express');
const router=express.Router();
const postControllers=require('../controllers/post.controllers');
const {authUser,authUserOrAdmin} =require('../middleware/auth.middeware')

router.post('/create',authUser ,postControllers.create);

router.get('/get-all',postControllers.getAll);

router.get('/detail/:id',postControllers.detail);

router.patch('/update/:id/:userId',authUserOrAdmin,postControllers.update);

router.delete('/delete/:id/:userId',authUserOrAdmin,postControllers.delete)

module.exports=router