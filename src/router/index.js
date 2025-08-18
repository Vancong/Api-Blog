const userRouter=require('./user.router');
const postRouter=require('./post.router')
module.exports.index=(app) =>{
    app.use('/user',userRouter)
    app.use('/post',postRouter)
}