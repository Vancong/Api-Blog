const express=require('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser')
dotenv.config();
const routers=require('./router/index');

const PORT=process.env.PORT||3002;

const dtb=require('./config/database');

dtb.connect();

app.use(cors({
  origin: "*",   
}))

app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());

routers.index(app)

app.get('/', (req,res) =>{
    res.send('ok')
})

app.listen(PORT,() =>{
    console.log(`Dang chay cong ${PORT}`)
})

