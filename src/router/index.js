const userRouter=require('./user.router');
const postRouter=require('./post.router')
const commentRouter=require('./comment.router')
const authRouter=require('./auth.router')
module.exports.index=(app) =>{
    app.use('/auth',authRouter)
    app.use('/users',userRouter)
    app.use('/posts',postRouter)
    app.use('/comments',commentRouter)
}