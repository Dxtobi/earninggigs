const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const WithdrawSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
        },
    bankName: {
        type: String,
    },
    accountName: {
        type: String,
    },
    bankAccount: {
        type: String,
    },
    status: {
        type: String,
        default:'Pending'
    }
});
module.exports=mongoose.model('WithdrawSchema', WithdrawSchema)