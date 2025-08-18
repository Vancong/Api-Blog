const express=require('express');
const router=express.Router();
const commentControllers=require('../controllers/comment.controllers');
const {authUser,authUserOrAdmin}=require('../middleware/auth.middeware')

router.post('/create',authUser,commentControllers.create);

router.patch('/update/:id/:userId',authUserOrAdmin,commentControllers.update)

router.delete('/delete/:id/:userId',authUserOrAdmin,commentControllers.delete)

router.get('/get-all/:postId',commentControllers.getAll)

module.exports=router;