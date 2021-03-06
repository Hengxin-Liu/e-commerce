import express from 'express';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js"


const productRouter = express.Router();

productRouter.get('/',
   expressAsyncHandler( async(req, res) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.seller || '';
    const min = 
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = 
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating) : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i'}} : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ?  { price : { $gte: min, $lte: max}} : {};
    const ratingFilter = rating ? { rating: { $gte: rating}} : {};
    const sortOrder = 
      order === 'lowest' 
      ? { price: 1 } 
      : order === 'highest' 
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : { _id: -1 };
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    }).populate('seller','seller.name seller.logo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({products, page, pages: Math.ceil(count / pageSize)}); //if it's 2.5 return 3
})
);

productRouter.get('/categories',
 expressAsyncHandler( async(req, res) => {
   const categories = await Product.find().distinct('category');
   res.send(categories);
 }));

productRouter.get(
    '/seed',
    expressAsyncHandler( async(req, res) => {
  /* await Product.remove({});
   const createProducts = await Product.insertMany(data.products);*/
    res.send({createProducts});
})

);

productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
   const product = await Product.findById(req.params.id).populate('seller');
   if (product){
        res.send(product);
    }else{
        res.status(404).send({message:'Product Not Fonud'});
    }
})
);

productRouter.post('/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req,res) => {
   const product = new Product({
       name: 'sample name',
       seller: req.user._id,
       image: 'images/p1.jpg',
       price: 0,
       category: 'sample catergory',
       brand: 'sample brand',
       countInStock: '0',
       rating: 0,
       numReviews: 0,
       description: 'sample description',
   });
   const createProduct = await product.save();
   res.send({message:'Product Ceated', product: createProduct});
})
);

productRouter.put(
   '/:id',
   isAuth,
   isSellerOrAdmin,
   expressAsyncHandler(async(req, res) => { 
    const productId = req.params.id;
    const product = await Product.findById(productId);
     if(product){
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({message: 'Product Updated', product: updatedProduct});
    }else{
      res.status(404).send({message: 'Product Not Found'});
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Deleted successfully', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
export default productRouter;