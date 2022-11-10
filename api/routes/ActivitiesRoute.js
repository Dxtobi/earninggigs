const Activities = require('../models/Activities');
const Coupon=require('../models/Coupon')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const ResentActivities = require('../models/ResentActivities');
const Withdraw = require('../models/Withdraw');
const sendEmail = require('../sendEmail');
const Referer = require('../models/Referer');
require('dotenv').config()


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
        <h4>Hello ${e.name} ${e.message}</h4>
    </div>`
    )
}
const couponGenerate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012456789'
    let result = ''
    let charsL = chars.length
    //let random = new Random();

    for(let i = 0; i<11; i++) {
        result += chars.charAt(Math.floor(Math.random() * charsL));
    }

   
    return result
}

module.exports = function (router) {

    //GET

    router.post('/create-ads', function (req, res) {
        // console.log(req.body)

        try {
            const activitiesData = {
                link: req.body.link,
                platform: req.body.platform,
                paying: req.body.paying,
                type: req.body.type,
                user: req.body.uid
            }
            userModel.findOne({ _id: req.body.uid }).then((user) => {
                if (parseFloat(user.currentBallance) > parseFloat(req.body.paying)||parseFloat(user.currentBallance) === parseFloat(req.body.paying)) {
                    user.currentBallance = parseFloat(user.currentBallance) - parseFloat(req.body.paying)
                    user.save().then((newUser) => {
                        Activities.create(activitiesData, (err, d)=>{
                            if(err){res.json({status:false, message:err})}
                            else{res.json({status:true, message:`Task created`, data:d})}
                        })
                })
                } else {
                    res.json({status:false, message:`Insufficient`})
               }
            })
            
        } catch (error) {
            res.json({status:false, message:'something went wrong'})
        }
    })

   
    //get-user
    router.post('/get-user', function (req, res) {
        console.log(req.body)

    try {
            userModel.findOne({ email: req.body.email }).then((newUser) => {
                    try{
                        const userLoad={
                            _id:newUser.id,
                            name:newUser.name,
                            email:newUser.email,
                            phone:newUser.phone,
                            currentBallance:newUser.currentBallance,
                            subscription:newUser.subscription,
                            adm: newUser.admin,
                            totalEarning:newUser.totalEarning,
                            points: newUser.points,
                            lastDatePoint:newUser.lastDatePoint
                        }
                        let token=jwt.sign(userLoad,process.env.SECRET_KEY,{expiresIn:20000000})
                        return  res.json({token:token, status:true})
                    }
                    catch(err){
                        console.log('get-user-route>>>>',err)
                        res.json({status:404, message:"something went wrong"})
                    }
                })
                
            
        
    } catch (error) {
        console.log(error)
        res.json({status:false, message:'something went wrong'})
    }
    })

    router.post('/confirm-coupon', function (req, res) {
         console.log(req.body)

        try {
            Coupon.findOne({code:req.body.coupon}).then((data) => {
                if (data && data.type !== 'funding') {
                    userModel.findOne({ email: req.body.email }).then((user) => {
                        //user.currentBallance += parseFloat(data.type)
                        user.subscription = data.amount === '5000' ? 'BASIC' : data.amount === '10000'? 'GOLD': data.amount === '15000'? 'DIAMOND':'SIMPLE'
                        user.save().then((newUser) => {
                            if (newUser.ref !== 'no referer' || newUser.ref !== "") {
                                userModel.findOne({ email: newUser.ref }).then((referer) => {
                                    console.log(newUser.ref, referer)
                                    if (referer && (referer !== undefined || referer !== null)) {
                                                referer.currentBallance = parseFloat(referer.currentBallance) + 500
                                            ResentActivities.create({
                                                user: referer._id,
                                                description:`${referer.name} Just Earned NGN500 referer`
                                            })

                                            Referer.create({
                                                user: referer._id,
                                                description:`You Earned NGN500 for refering ${newUser.name}`
                                            })
                                            referer.save()
                                    }
                                    
                                   return
                                })
                            }
                            Coupon.findOneAndRemove({ code: req.body.coupon }).then(() => {
                                console.log(newUser)
                                try{
                                        const userLoad={
                                            _id:newUser.id,
                                            name:newUser.name,
                                            email:newUser.email,
                                            phone:newUser.phone,
                                            currentBallance:newUser.currentBallance,
                                            subscription:newUser.subscription,
                                            adm:newUser.admin,
                                        }
                                        
                                        let token=jwt.sign(userLoad,process.env.SECRET_KEY,{expiresIn:20000000})
                                        return  res.json({token:token, status:true, message:"coupon code confirm"})
                                }
                                catch(err){
                                  return  res.json({ status:false, message:"coupon not confirm"})
                                }
                            })
                        })
                    })
                 }else{
                    res.json({status:false, message:"coupon not found"})
                    }
            }).catch((err) => {

                console.log(err)
                return res.json({status:false, message:"coupon not found"})
            })
        } catch (error) {
            console.log(error)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.post('/confirm-coupon-fund', function (req, res) {
        console.log(req.body)

       try {
           Coupon.findOne({code:req.body.coupon}).then((data) => {
               if (data && data.type !== 'SUBSCRIPTION') {
                   userModel.findOne({ email: req.body.email }).then((user) => {
                       user.currentBallance += parseFloat(data.amount)
                      // user.subscription = data.amount === '5000' ? 'BASIC' : data.type === '10000'? 'GOLD': data.type === '15000'? 'DIAMOND':'PREMIUM'
                       user.save().then((newUser) => {
                           Coupon.findOneAndRemove({ code: req.body.coupon }).then(() => {
                               //console.log(newUser)
                                    try{
                                       const userLoad={
                                           _id:newUser._id,
                                           name:newUser.name,
                                           email:newUser.email,
                                           phone:newUser.phone,
                                           currentBallance:newUser.currentBallance,
                                           subscription:newUser.subscription,
                                           adm:newUser.admin,
                                       }
                                   let token = jwt.sign(userLoad, process.env.SECRET_KEY, { expiresIn: 20000000 })
                                   ResentActivities.create({
                                       user: newUser._id,
                                       description:`${newUser.name} Just Got NGN${newUser.currentBallance} on Their Current Ballance `
                                   })
                                       return  res.json({token:token, status:true, message:"coupon code confirm"})
                               }
                               catch(err){
                                   console.log(err)
                                   res.json({status:false, message:"coupon not found"+err.message})
                               }
                           })
                       })
                   })
               } else {
                res.json({status:false, message:"coupon not found"})
                }

           }).catch((err) => {
               console.log(err)
           })
       } catch (error) {
           console.log(error)
           res.json({status:false, message:'something went wrong'})
       }
    })

    router.post('/generate-coupon', function (req, res) {
        const coupon = couponGenerate()
        try {
            userModel.findOne({email:req.body.email}).then((data) => {
               // console.log(data)
                if (data.admin) {
                    Coupon.create({
                        code: coupon,
                        type: 'SUBSCRIPTION',
                        amount: req.body.coupon,
                    }).then((e) => {
                        console.log(e)
                        return res.json({status:true, message:'200', data:e})
                    })
                    return
                } else {
                    res.json({status:false, message:'something went wrong'})
                }
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.post('/generate-coupon-fund', function (req, res) {
        const coupon = couponGenerate()
        try {
            userModel.findOne({email:req.body.email}).then((data) => {
               // console.log(data)
                if (data.admin) {
                    Coupon.create({
                        code: coupon,
                        type: 'funding',
                        amount:req.body.coupon
                    }).then((e) => {
                        console.log(e)
                        return res.json({status:true, message:'200', data:e})
                    })
                    return
                } else {
                    res.json({status:false, message:'something went wrong'})
                }
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            res.json({status:false, message:'something went wrong'})
        }
    })
//tasks
    router.post('/confirm-tasks', function (req, res) {
        console.log(req.body)

       try {
           Activities.findOne({_id:req.body.id}).then((data) => {
              
           }).catch((err) => {
               console.log(err)
               res.json({status:false, message:'something went wrong'+err.message})
           })
       } catch (err) {
           console.log(err)
           res.json({status:false, message:'something went wrong'+err.message})
       }
    })

    router.post('/approve-tasks', function (req, res) {
        try {
            Activities.findOne({_id:req.body.id}).then((data) => {
               
            }).catch((err) => {
                console.log(err)
                res.json({status:false, message:'something went wrong'+err.message})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'+err.message})
        }
    })

    router.post('/perform-tasks', function (req, res) {
        try {
            console.log(req.body)
            Activities.findOne({ _id: req.body.id }).then((data) => {
                if (parseFloat(data.paying) > 5) {
                    data.doneBy.push({ user: req.body.user })
                    data.paying = parseFloat(data.paying) - 4
                    data.save().then((act) => {
                        userModel.findOne({ _id: req.body.user }).then((au) => {
                            console.log(au)

                            au.totalEarning = parseFloat(au.totalEarning) + parseFloat(req.body.earned)
                           // au.currentBallance = parseFloat(au.currentBallance) + parseFloat(req.body.earned)
                            au.save()
                            ResentActivities.create({
                                user: au._id,
                                description:`${au.name} Just Earned NGN${req.body.earned} for a task `
                            })
                        })
                    res.json({ status: true, message: '', data:act})
                    })
                } else {
                    Activities.findOneAndDelete({ _id: req.body.id })
                    res.json({status:false, message:'Insufficient'})
                }
            }).catch((err) => {
                console.log(err)
                res.json({status:false, message:'something went wrong'+err.message})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'+err.message})
        }
    })

    router.get('/get-tasks/:id', function (req, res) {
        console.log(req.params)
        try {
            Activities.find().limit(10).then((data) => {
                console.log(data.length)
                return res.json({status:true, message:'200', data:data})
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.post('/make-withdraw', function (req, res) {
        try {
            //console.log(req.body)
            userModel.findOne({_id:req.body.user}).then((us)=>{
                ResentActivities.create({
                    user: req.body.user,
                    description:`${us.name} withdrew NGN${us.currentBallance} `
                })

                sendEmail({to:us.email, subject:'Withdrawal Request', text:htmlReturn({name:us.name, topic:'Transaction Request', message:'Your Withdrawal Request has been Received and your completed tasks are being confirmed'})})
            })
            
            Withdraw.create(req.body).then((data)=>{
                res.json({status:true, message:'Request submitted', data:data})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.post('/confirm-withdraw', function (req, res) {
        try {
            console.log(req.body)

            Withdraw.findOne({_id:req.body.id}).then((wd)=>{
                wd.status = 'PAID'
                userModel.findOne({_id:wd.user}).then((use)=>{
                    use.currentBallance = 0
                    use.totalEarning = 0
                    use.subscription = 'no sub'
                    use.save()
                    sendEmail({to:use.email, subject:'Withdrawal Approved', text:htmlReturn({name:use.name, topic:'Transaction Request', message:'Congratulations Your Withdrawal Request has been Approved ANd Your Money Is On its way..'})})
                })
                wd.save().then(() => {
                    res.json({status:true, message:'Done'})
                })

            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.get('/get-withdraw/:id', function (req, res) {
        try {
            console.log(req.params)

            Withdraw.findOne({ user: req.params.id }).populate('user').then((wd) => {
                console.log(wd)
                res.json({status:true, data:wd, message:'Done'})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.get('/get-activities', function (req, res) {
        try {
            console.log(req.body)
            ResentActivities.find().limit(6).sort({date:-1}).then((act)=>{
              //  console.log(act)
                res.json({status:true, message:'', data:act})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.get('/get-user-referrers/:id', function (req, res) {
        try {
            console.log(req.params)
            Referer.find({user:req.params.id}).sort({date:-1}).then((act)=>{
              //  console.log(act)
                res.json({status:true, message:'', data:act})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.get('/get-withdraw-request', function (req, res) {
        try {
            console.log(req.body)
            Withdraw.find({ status: 'Pending' }).populate('user').then((wd) => {
                res.json({status:true, message:'', data:wd})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    //get-withdraw-request
    router.get('/get-top-users', function (req, res) {
        try {
           
            userModel.find().sort('-totalEarning').limit(3).then((act)=>{
                //console.log(act)
                res.json({status:true, message:'', data:act})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.post('/add-user-point', function (req, res) {
        try {
            userModel.findOne({_id:req.body.id}).then((act)=>{
                act.points = parseInt(act.points) + parseInt(req.body.points)
                act.lastDatePoint = new Date().getTime()
                act.save().then(()=>{
                    res.json({status:true, message:'', data:act})
                })
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })

    router.get('/get-top-users-point', function (req, res) {
        try {
             userModel.find().sort('-points').limit(3).then((act)=>{
                //console.log(act)
                res.json({status:true, message:'', data:act})
            })
        } catch (err) {
            console.log(err)
            res.json({status:false, message:'something went wrong'})
        }
    })
}