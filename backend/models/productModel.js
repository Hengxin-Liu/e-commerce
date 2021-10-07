import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type :String , requird : true , unique : true},
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: {type :String , requird : true },
    brand: {type :String , requird : true },
    category: {type :String , requird : true },
    description: {type :String , requird : true },
    price: {type :Number , requird : true },
    countInStock: {type :Number , requird : true },
    rating: {type :Number , requird : true },
    numReviews: {type :Number , requird : true },
},
{
    timestamps:true,
});

const Product=mongoose.model('Product',productSchema);
export default Product;