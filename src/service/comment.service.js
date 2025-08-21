const CommentDtb=require('../models/comment.models')
const createError=require('../helpers/createError.helpers');

module.exports.create=async (data,userId) =>{
    const {content,postId,parentId}=data;
    const newComment= new CommentDtb({
        content,
        post:postId,
        user:userId,
        parentId: parentId ||null
    })

    await newComment.save()
    return {
        status: 'OK',
        message: parentId? "Trả lời comment" : 'Tạo comment thành công',
        data: newComment
    }
}

module.exports.update=async (req) =>{
    const { content } = req.body;
    const commentUpdate = req.comment;

    commentUpdate.content = content;
    await commentUpdate.save();

    return {
        status: 'OK',
        message: 'Cập nhật comment thành công',
        data: commentUpdate
    };
}

module.exports.delete=async (req) =>{
    const comment = req.comment;
    if(!comment.parentId) {
        await CommentDtb.deleteMany({
            parentId: comment._id
        })
    }
    await CommentDtb.deleteOne({_id:comment._id})

    return {
        status: 'OK',
        message: 'Xóa comment thành công',
    }
}

module.exports.getAll=async (postId) =>{
    const comments=await CommentDtb.find({
        post:postId
    }).populate('user','fullName email thumbnail').lean();

    if(comments.length===0) {
        throw createError(404,'Không có comment')
    }

    const parentCmts=comments.filter(cmt => !cmt.parentId)

    const allCmts= parentCmts.map(parent  => {
        const repCmt= comments.filter(cmt => cmt.parentId&& cmt.parentId.toString()===parent._id.toString());
        return {...parent,repCmt}
    })

    return {
        status: 'OK',
        message: 'Thành công',
        data: allCmts
    }
}

module.exports.tonggleLike=async(req) =>{

    const commentId = req.params.commentId; 
    const userId = req.user.id;
    const comment=await CommentDtb.findById(commentId)
    
    if(comment.likes.includes(userId)) {
        console.log(comment.likes)
        comment.likes=comment.likes.filter(userlike => userlike.toString()!==userId.toString())
    }
    else {
        comment.likes.push(userId)
    }
    
    await comment.save()
    return {
        status: 'OK',
        message: 'Thành công',
        data: comment.likes ||[]
    }
}