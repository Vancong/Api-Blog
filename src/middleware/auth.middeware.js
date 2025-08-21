const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const createError = require('../helpers/createError.helpers');
const UserDtb = require('../models/User.models');
const PostDtb = require('../models/Post.models');
const CommentDtb = require('../models/comment.models');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token || req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token)
  if (!token) throw createError(401, 'Thiếu token');

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) throw createError(401, 'Token không hợp lệ');
    req.user = user; 
    next();
  });
};

const authUser = (req, res, next) => {
    verifyToken(req, res, next);
}

const authAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) throw createError(403, 'Không có quyền admin');
    next();
  });
};


const authUserOrAdmin = asyncHandler(async (req, res, next) => {

  const user = await UserDtb.findById(req.params.userId || req.user.id);
  if (req.user.id === user.id.toString() || req.user.isAdmin) {
    req.targetUser = user; 
    return next();
  }
  throw createError(403, 'Không đủ quyền');
});


const authUserOrAdminPost = asyncHandler(async (req, res, next) => {

  const post = await PostDtb.findById(req.params.postId);
  if (!post) throw createError(404, 'Post không tồn tại');

  if (req.user.id === post.user.toString() || req.user.isAdmin) {
    req.post = post; 
    return next();
  }

  throw createError(403, 'Không đủ quyền');
});


const authUserOrAdminComment = asyncHandler(async (req, res, next) => {

  const comment = await CommentDtb.findById(req.params.commentId);
  if (!comment) throw createError(404, 'Comment không tồn tại');

  if (req.user.id === comment.user.toString() || req.user.isAdmin) {
    req.comment = comment; 
    return next();
  }

  throw createError(403, 'Không đủ quyền');
});

module.exports = {
  authUser,
  authAdmin,
  authUserOrAdmin,
  authUserOrAdminPost,
  authUserOrAdminComment,
};
