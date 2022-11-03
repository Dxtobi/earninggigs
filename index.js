const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')

const api=require('./api')
const path = require('path');

const root = require('path').join(__dirname, 'client', 'build')
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(root));
//app.use(morgan('dev'))
require('dotenv').config()


const monogUrl=process.env.MONGO_DB || 'mongodb://localhost:27017/earninggigs'
mongoose.connect(monogUrl,{useNewUrlParser:true})

app.use('/api', api)

if(process.env.NODE_ENV === 'production'){
    //set static folder
    //app.use(express.static("client/build"));
  
  app.use(express.static(root));
  
  console.log('😸 in production............')
  app.get("*", (req, res) => {
 
   
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
})
}



const db=mongoose.connection

const port=process.env.PORT || 8081


db.on('error',console.error.bind(console,"connection error:"));
db.once('open',function(){
    console.log("Successfuly Connected  to MONGODB")
    app.listen(port,()=>{
        console.log(`Server is now active on ${port}`)
    })
})