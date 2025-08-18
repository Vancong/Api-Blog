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

    module.exports.update=async (data) =>{
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

        const checkComment=await CommentDtb.findById(commentId);
        if(!checkComment)   throw createError(400,'Không tồn tại comment')
        if(!checkComment.parentId) {
            await CommentDtb.deleteMany({
                parentId: checkComment._id
            })
        }
        await CommentDtb.deleteOne({_id:commentId})

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

    module.exports.tonggleLike=async(commentId,userId) =>{
    
        const comment=await CommentDtb.findById(commentId)
        if(!comment) {
            throw createError(400,'Không tồn tại comment')
        }
        if(comment.likes.includes(userId)) {
            comment.likes=comment.likes.filter(userlike => userlike!==userId)
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