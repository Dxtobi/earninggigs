const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  admin: {
    type: Boolean,
    default: false,
  },
  phone: { type: String },
  password: { type: String },
  currentBallance: {
      type: Number,
      default: 0
  },
  totalEarning: {
    type: Number,
    default: 0
  },
  subscription: {
    type: String,
    default: 'no sub'
  },
  ref: { type: String,
  default: 'no referer' },
  points: { type: Number,
    default: 0
  },
  lastDatePoint: {
    type: Number,
    default: 0
  }
  ,
});
module.exports=mongoose.model('user',userSchema)