const createError=require('../helpers/createError.helpers');
const postDtb=require('../models/Post.models')

module.exports.create=async(data,userId) =>{
    const {title,content,tags,thumbnail}=data;
    const post= new postDtb({
        title,
        content,
        tags,
        thumbnail,
        user: userId
    })
     await post.save();
    return {
        status: 'OK',
        message: 'Tạo bài viết thành công',
        data: post
    }
}

module.exports.getAll=async() =>{
   
    const posts=await postDtb.find()
                    .populate('user','fullName email')
                    .sort({createdAt: -1})


    return {
        status: 'OK',
        message: 'Tạo bài viết thành công',
        data: posts
    }
}

module.exports.detail=async(id) =>{
   
    const post=await postDtb.findById(id)
                    .populate('user','fullName email')

    if(!post) {
        throw createError(400,'Không tồn tại bài viết')
    }
    return {
        status: 'OK',
        message: 'Thành công',
        data: post
    }
}

module.exports.update=async(data,id) =>{
   
    const post=await postDtb.findById(id)
        
    if(!post) {
        throw createError(400,'Không tồn tại bài viết')
    }
    if(data.user) delete data.user;
    const postUpdate= await postDtb.findOneAndUpdate({
        _id: id
    },data,{new:true});

    return {
        status: 'OK',
        message: 'Cập nhật bài viết thành công',
        data: postUpdate
    }
}


module.exports.delete=async(id) =>{
   
    const post=await postDtb.findById(id)
        
    if(!post) {
        throw createError(400,'Không tồn tại bài viết')
    }
    
    await postDtb.deleteOne({
        _id:id
    })
    return {
        status: 'OK',
        message: 'Xóa bài viết thành công',
    }
}