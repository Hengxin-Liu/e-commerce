import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js';
import orderRouter from './router/orderRouter.js';
import uploadRouter from './router/uploadRouter.js';

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
app.use('/api/uploads',uploadRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
//get absolute path calculation of a relative path using path.resolve()
const __dirname = path.resolve();
//Serve static content for the app from the “uploads” directory in the application directory:
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
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