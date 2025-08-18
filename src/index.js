const express=require('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT||3002;

const dtb=require('./config/database');
dtb.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req,res) =>{
    res.send('ok')
})

app.listen(PORT,() =>{
    console.log(`Dang chay cong ${PORT}`)
})

