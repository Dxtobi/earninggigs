const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
module.exports=function(router){

//GET

router.post('/register',function(req,res){
     // console.log(req.body)
      const userData={
          name:req.body.name,
          email:req.body.email,
          phone:req.body.phone,
          password:req.body.pass,
          ref:req.body.ref
      }
      userModel.findOne({email:req.body.email},(err,user)=>{
          if(err){res.json({status:false,message:err})}
          else{
              if(!user){
                  bcrypt.hash(req.body.pass,10,(err,hash)=>{
                      userData.password=hash
                      userModel.create(userData,(err)=>{
                          if(err){res.json({status:false, message:err})}
                          else{res.json({status:true, message:`Registration sucessful!!!!`})}
                      })
                  })
              }
              else {
                  console.log('false')
                  res.json({status:false, message:"user already exists"})
              }

          }
      })
  })

//POST

router.post('/login',(req,res) =>{
    userModel.findOne({ phone: req.body.phone }, async (err, user) => {
        console.log(req.body)
        if (err) {
            res.json({status:false,message:err})
        }else{
            if(user){
                try{
                    const match=await bcrypt.compare(req.body.pass,user.password)
                    if(match){
                        const userLoad={
                            _id:user.id,
                            name:user.name,
                            email:user.email,
                            phone:user.phone,
                            currentBallance:user.currentBallance,
                            subscription:user.subscription,
                            adm:user.admin,
                        }
                        let token=jwt.sign(userLoad,process.env.SECRET_KEY,{expiresIn:20000000})
                        res.json({token:token, status:true, message:"logged in Successfully"})
                    }
                    else {
                        console.log('not match')
                        res.json({status:false, message:"Customer not found"})
                    }
                }
                catch(err){
                    console.log(err)
                }
            }    
            else{
                    res.json({status:false,message:"Customer not found"})
                }
            }
        })
    })
//DELETE
}