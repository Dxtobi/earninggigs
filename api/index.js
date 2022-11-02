const express = require('express');
const router=express.Router();

require('./routes/usersRouth')(router)
require('./routes/ActivitiesRoute')(router)



module.exports=router