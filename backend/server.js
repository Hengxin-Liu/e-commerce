import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js';
import orderRouter from './router/orderRouter.js';

dotenv.config();

const app=express();
//pause json data in http body of request
app.use(express.json());
//request contains data will translate  react node body
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/amazona',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  
});

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use((err,req,res,next) =>{
    res.status(500).send({message:err.message});
});


const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
});