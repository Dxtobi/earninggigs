const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const resentActivitySchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
        },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('resentActivities', resentActivitySchema)