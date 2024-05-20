const express=require('express')
const router =express.Router()
const {cacheData} = require('../cachemiddleware/cachemiddleware.js')
const {getTheWeather} =require('../controllers/apicontrollers.js')

router.get('/getWeather/:location/:date',cacheData,getTheWeather)

module.exports=router;