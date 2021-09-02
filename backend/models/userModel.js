import  mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type: String, reuired:true, unique:true},
    password: {type: String, reuired:true},
    isAdmin: {type: Boolean, default: true, required:true},

},
{
    timestamps: true,
}
);

const User = mongoose.model('User',userSchema);
export default User;