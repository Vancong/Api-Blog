const UserDtb=require('../models/User.models');
const createError=require('../helpers/createError.helpers')
const JwtService=require('./jwt.service')
const bcrypt =require('bcrypt')

module.exports.register= async(data) =>{
    let {fullName,password,email}=data;
    const checkUser=await UserDtb.findOne({
        email: email
    })
    if(checkUser) {
        throw createError(400,'Đã tồn tại email trong hệ thống')
    }
    password=await bcrypt.hash(password,10);
    const newUser= new UserDtb({
        fullName,
        email,
        password
    })
    await newUser.save();

    return {
        status: 'OK',
        message: "Tạo user thành công",
        data: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
        },
    }
}



module.exports.login=async (data)=>{
    let {email,password}=data;
    const checkUser=await UserDtb.findOne({
        email:email
    })
    if(!checkUser) throw createError(400,'Email không tồn tại')
     const checkPass=await bcrypt.compare(password,checkUser.password);
    if(!checkPass) throw createError(400,'Sai mật khẩu')

    const access_token=JwtService.generateAccessToken({
        id: checkUser._id,
        email,
        isAdmin: checkUser.isAdmin
    })
    const refresh_token=JwtService.generateRefreshToken({
         id: checkUser._id,
        email,
        isAdmin: checkUser.isAdmin
    })
    

    return {
        status: 'OK',
        message:'Đăng nhập thành công',
        access_token,
        refresh_token
    }
}


module.exports.update= async(data,userId) =>{
    let {fullName,email,bio,}=data;
    let checkUser=await UserDtb.findById(userId)
    if(!checkUser) {
        throw createError(404,' Không tồn tại user')
    }
    const updateUser= await UserDtb.findByIdAndUpdate({
        _id:userId
    },{
        fullName,email,bio
    },{new:true})


    return {
        status: 'OK',
        message: "Cập nhật thành công",
        data: updateUser
    }
}

module.exports.changePassword= async(data,userId) =>{
    let {oldPassword,newPassword}=data;
    let checkUser=await UserDtb.findById(userId)
    if(!checkUser) {
        throw createError(404,' Không tồn tại user')
    }

    const checkPass= await bcrypt.compare(oldPassword,checkUser.password);
    if(!checkPass)    throw createError(400,' Mật khẩu cũ không đúng')
    
    const hashPass= await bcrypt.hash(newPassword,10);

    checkUser.password=hashPass;
    
    await checkUser.save();


    return {
        status: 'OK',
        message: "Đổi mật khẩu thành công",
    }
}
