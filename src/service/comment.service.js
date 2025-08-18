const CommentDtb=require('../models/comment.models')
const createError=require('../helpers/createError.helpers');

module.exports.create=async (data,userId) =>{
    const {content,post}=data;
    const newComment= new CommentDtb({
        content,
        post,
        user:userId
    })

    await newComment.save()
    return {
        status: 'OK',
        message: 'Tạo comment thành công',
        data: newComment
    }
}

module.exports.update=async (data,userId) =>{
    const {content,commentId}=data;

    const commentUpdate= await CommentDtb.findById(commentId);
    if(!commentUpdate) {
        throw createError(404,'Không tồn tại comment')
    }
    commentUpdate.content=content;
     await commentUpdate.save()
    

    return {
        status: 'OK',
        message: 'Cập nhật comment thành công',
        data: commentUpdate
    }
}

module.exports.delete=async (commentId) =>{

    const checkComment=await CommentDtb.findById(commentId)
    if(!checkComment)   throw createError(400,'Không tồn tại comment')
    
    await CommentDtb.deleteOne({_id:commentId})

    return {
        status: 'OK',
        message: 'Xóa comment thành công',
    }
}

module.exports.getAll=async (postId) =>{
    const comments=await CommentDtb.find({
        post:postId
    }).populate('user','fullName email thumbnail')
    if(comments.length===0) {
        throw createError(404,'Không có comment')
    }


    return {
        status: 'OK',
        message: 'Thành công',
        data: comments
    }
}