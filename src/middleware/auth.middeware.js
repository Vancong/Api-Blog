const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next) =>{
  const authHeader=req.headers.token;
  console.log(authHeader)
  const token=authHeader&&authHeader.split(' ')[1];
  if(!token) {
       return res.status(401).json({ status: 'ERR', message: 'Thiếu token' });
  }
  jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
      if(err) {
        return res.status(401).json({ status: 'ERR', message: 'Token không hợp lệ' });
      }
      req.user=user;
      next();
  })
}

const authUser=(req,res,next) =>{
  verifyToken(req,res,next);
}

const authAdmin=(req,res,next)=>{
  verifyToken(req,res,()=>{
    if(!req.user.isAdmin) {
      return res.status(404).json({ status: 'ERR', message: 'Không có quyền admin' })
    }
    next();
  })
}
const authUserOrAdmin  = (req, res, next) => {
  verifyToken(req,res, () =>{
    if(req.user.id===req.params.userId||req.user.isAdmin) {
        next();
    }
    else {
       
      return res.status(403).json({ status: 'ERR', message: 'Không đủ quyền' });
    }
  })
};

module.exports = {
  authUserOrAdmin,
  authAdmin,
  authUser
};
