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

module.exports.getAll=async(data) =>{
    const {limit=4,page=1,search='',tags,key='createdAt',value='desc'}=data;
    let query={};
    if(tags){
        const tags=data.tags.split(',')
        query.tags={$in: tags} 
    }
    if(search.trim()) {
        query.$or=[
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } }
        ]
    }
    console.log(query)
    
    let sort={};
    if(key&&value) {
        const sortValue=value==='asc'?1:-1
        sort[key]=sortValue;
    }

    const skip= (page-1)*limit;

    const posts=await postDtb.find(query)
                    .populate('user','fullName email')
                    .skip(skip)
                    .limit(limit)
                    .sort(sort)
                              
    const total=await postDtb.countDocuments(query);
    return {
        status: 'OK',
        message: 'Lấy danh sách bài viết thành công',
        data: posts,
        pagination:{
            total,
            toalPages: Math.ceil(total/limit)
        }

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

module.exports.update=async(req) =>{
    const data=req.body;
    const postUpdate=req.post;
    
    if(data.user) delete data.user;

    for (let key in data) {
        postUpdate[key] = data[key];
    }

    await postUpdate.save();

    return {
        status: 'OK',
        message: 'Cập nhật bài viết thành công',
        data: postUpdate
    }
}


module.exports.delete=async(req) =>{
   
    await postDtb.deleteOne({
        _id:req.post._id
    })
    return {
        status: 'OK',
        message: 'Xóa bài viết thành công',
    }
}

module.exports.tonggleLike=async(req) =>{
    const postId=req.params.postId;
    const userId=req.user.id;
    
    const post=await postDtb.findById(postId)

    if(post.likes.includes(userId)) {
        post.likes=post.likes.filter(userlike => userlike.toString()!==userId.toString())
    }
    else {
        post.likes.push(userId)
    }
    
    await post.save()
    return {
        status: 'OK',
        message: 'Thành công',
        data: post.likes ||[]
    }
}

module.exports.getPostUser=async(userId) =>{
   
    const getPostUser=await postDtb.find({
        user: userId
    }).populate('user','fullName')

    if(getPostUser.length===0) {
        throw createError(400,'Không có bài viết nào')
    }

    return {
        status: 'OK',
        message: 'Thành công',
        data: getPostUser
    }
}