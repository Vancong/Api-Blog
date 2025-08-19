const asyncHandler =require('express-async-handler');
const UserService=require('../service/user.service');
const JwtService=require('../service/jwt.service')
const createError=require('../helpers/createError.helpers')
module.exports.register=asyncHandler(async(req,res)=>{
    const data=req.body;
    const response=await UserService.register(data);
    return res.status(200).json(response)
})

module.exports.login=asyncHandler(async(req,res)=>{

    const user=await UserService.login(req.body); 
    const {refresh_token,...newUser}=user;
    res.cookie('refresh_token',refresh_token,{
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: 365 * 24 * 60 * 60 * 1000 
    })
    return res.status(200).json(newUser);
})

module.exports.refreshToken=asyncHandler(async (req,res) =>{
    console.log('Token client gửi lên refresh:', req.cookies.refresh_token);
    const token=req.cookies.refresh_token;
    if(!token) {
        throw createError(401, 'Thiếu refresh token');
    }
    const response=await JwtService.refreshTokenService(token);
    return res.status(200).json(response);
})

module.exports.logout=asyncHandler(async (req,res) =>{
    
    res.clearCookie('refresh_token');
    return res.status(200).json({
        status: 'OK',
        message: 'Đăng xuất thành công'
    })
})

module.exports.update=asyncHandler(async(req,res)=>{
    const data=req.body;
    const response=await UserService.update(data,req.user.id);
    return res.status(200).json(response)
})

module.exports.changePassword=asyncHandler(async(req,res)=>{
    const data=req.body;
    const response=await UserService.changePassword(data,req.user.id);
    return res.status(200).json(response)
})