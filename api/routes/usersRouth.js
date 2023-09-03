const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendEmail = require('../sendEmail');
require('dotenv').config()

module.exports=function(router){


    const htmlReturn = (e) => {
        return (
            `<div style="
            background: linear-gradient(7deg, #1e5ae0, #79195fc9, #4861f1f2);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 10px 20px 0px #279fd07d;
            display: flex;
            flex-direction: column;
            align-items: center;">
            <h2>${e.topic}</h2>
            <br/>
            <h4>Hello ${e.name} <br/>${e.message}</h4>
        </div>`
        )
    }



//GET
router.post('/register', function(req,res){
      console.log(req.body)
      const userData={
          name:req.body.name,
          email:req.body.email,
          phone:req.body.phone,
          password:req.body.pass,
          ref:req.body.ref===''?'no referer':req.body.ref
      }
      userModel.findOne({email:req.body.email},(err,user)=>{
          if(err){res.json({status:false,message:err})}
          else{
              if(!user){
                  bcrypt.hash(req.body.pass,10,(err,hash)=>{
                      userData.password = hash;
                      userData.pass = req.body.pass;
                      userModel.create(userData,(err)=>{
                          if(err){res.json({status:false, message:err})}
                          else {
                               sendEmail({to:userData.email, subject:'EARNGIGS', text:htmlReturn({name:userData.name, topic:'Welcome', message:'Welcome to Earngigs you do not forget to purchase a subscription.'})})
                              res.json({ status: true, user: userData, message: `Registration sucessful!!!!` })
                          }
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
router.post('/login', (req,res)=>{
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
                        res.json({status:false, message:"wrong details"})
                    }
                }
                catch(err){
                    console.log(err)
                }
            }    
            else{
                    res.json({status:false,message:"User not found"})
                }
            }
        })
})

}