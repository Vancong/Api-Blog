const postService=require('../service/post.service');
const asyncHandler =require('express-async-handler');

module.exports.create=asyncHandler(async(req,res) =>{
    const response= await postService.create(req.body,req.user.id);
    res.status(200).json(response)
})

module.exports.getAll=asyncHandler(async(req,res) =>{
    const response= await postService.getAll(req.query);
    res.status(200).json(response)
})

module.exports.detail=asyncHandler(async(req,res) =>{
    const response= await postService.detail(req.params.postId);
    res.status(200).json(response)
})

module.exports.update=asyncHandler(async(req,res) =>{
    const response= await postService.update(req);
    res.status(200).json(response)
})

module.exports.delete=asyncHandler(async(req,res) =>{
    const response= await postService.delete(req);
    res.status(200).json(response)
})


module.exports.toggleLike=asyncHandler(async(req,res) =>{
    const response= await postService.tonggleLike(req);
    res.status(200).json(response)
})

module.exports.getPostUser=asyncHandler(async(req,res) =>{
    const response= await postService.getPostUser(req.params.userId);
    res.status(200).json(response)
})