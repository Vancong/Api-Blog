const express=require('express');
const router=express.Router();
const commentControllers=require('../controllers/comment.controllers');
const {authUser,authUserOrAdminComment}=require('../middleware/auth.middeware')

router.post('/', authUser, commentControllers.create);

router.patch('/:commentId', authUser,authUserOrAdminComment, commentControllers.update);

router.delete('/:commentId', authUser,authUserOrAdminComment, commentControllers.delete); 

router.get('/post/:postId', commentControllers.getAll); 

router.post('/:commentId/toggle-like', authUser, commentControllers.tonggleLike); 


module.exports=router;