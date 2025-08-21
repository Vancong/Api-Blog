const commentService=require('../service/comment.service');
const asyncHandler =require('express-async-handler');

module.exports.create=asyncHandler(async(req,res) =>{
    const response= await commentService.create(req.body,req.user.id);
    res.status(200).json(response)
})

module.exports.update=asyncHandler(async(req,res) =>{
    const response= await commentService.update(req);
    res.status(200).json(response)
})


module.exports.delete=asyncHandler(async(req,res) =>{
    const response= await commentService.delete(req);
    res.status(200).json(response)
})




module.exports.getAll=asyncHandler(async(req,res) =>{
    const response= await commentService.getAll(req.params.postId);
    res.status(200).json(response)
})

module.exports.tonggleLike=asyncHandler(async(req,res) =>{
    const response= await commentService.tonggleLike(req);
    res.status(200).json(response)
})