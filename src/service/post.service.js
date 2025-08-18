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

module.exports.tonggleLike=async(postId,userId) =>{
   
    const post=await postDtb.findById(postId)
    if(!post) {
        throw createError(400,'Không tồn tại bài viết')
    }
    if(post.likes.includes(userId)) {
        post.likes=post.likes.filter(userlike => userlike!==userId)
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