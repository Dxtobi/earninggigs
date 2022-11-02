const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const adsSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
        },
    category: { type: String },
    location: { type: String },
    price: { type: String },
    description: { type: String },
    likes:  [
        {
             user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
             }
        }
    ],
    dislike:  [
        {
             user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
             }
        }
    ],
    views:  [
        {
             user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
             }
        }
    ],
    images: [],
    contactLink:{ type: String },
});
module.exports=mongoose.model('ads', adsSchema)