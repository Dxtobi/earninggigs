const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const activitiesSchema = new mongoose.Schema({
  user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
        },
  type: { type: String },
  platform: { type: String },
  link: { type: String },
  paying: {
      type: Number,
      default: 0
  },
  doneBy:  [
    {
         user:{
            type: Schema.Types.ObjectId,
            ref: 'user'
         }
    }
],
});
module.exports=mongoose.model('activities', activitiesSchema)