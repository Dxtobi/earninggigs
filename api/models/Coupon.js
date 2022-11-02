const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const couponSchema = new mongoose.Schema({
  type: { type: String },
  code: { type: String },
  amount: { type: String },
});
module.exports=mongoose.model('couponSchema', couponSchema)