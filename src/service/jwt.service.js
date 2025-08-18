const jwt=require('jsonwebtoken');




module.exports.generateAccessToken=(payload) =>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'1h'})
}


module.exports.generateRefreshToken=(payload) =>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:'365d'})
}

module.exports.refreshTokenService =(refreshToken)=>{
    return new Promise((resolve, reject) => {
        if(!refreshToken) {
            return resolve({
                status: 'ERR',
                message: 'Không co refreshToken'
            })
        }
        
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=>{
            if(err) {

                return resolve({
                    status: 'ERR',
                    message: 'refreshToken hết han hoặc không hợp lệ'
                })
            }
            const {isAdmin,email,id}=user;
            const newAccessToken=module.exports.generateAccessToken({
                isAdmin,email,id
            })
            return resolve({
                status: 'OK',
                message: 'Tạo access token mới thành công',
                accessToken: newAccessToken,
            });
        })
    })
}

