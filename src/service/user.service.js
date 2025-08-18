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