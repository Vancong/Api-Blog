const userRouter=require('./user.router');
const postRouter=require('./post.router')
const commentRouter=require('./comment.router')
module.exports.index=(app) =>{
    app.use('/user',userRouter)
    app.use('/post',postRouter)
    app.use('/comment',commentRouter)
}