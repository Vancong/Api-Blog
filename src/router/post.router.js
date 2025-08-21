const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/post.controllers');
const { authUser ,authUserOrAdminPost} = require('../middleware/auth.middeware');


router.post('/', authUser, postControllers.create); 

router.get('/', postControllers.getAll);             

router.get('/:postId', postControllers.detail);         

router.patch('/:postId',authUser ,authUserOrAdminPost, postControllers.update); 

router.delete('/:postId', authUser,authUserOrAdminPost, postControllers.delete);

router.post('/:postId/toggle-like', authUser, postControllers.toggleLike);

router.get('/user/:userId', authUser, postControllers.getPostUser);

module.exports = router;
