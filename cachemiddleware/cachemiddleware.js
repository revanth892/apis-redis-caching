const client = require('../config/redisclient.js')


const cacheData=async(req,res,next)=>{
    const location = req.params.location;
    const date =req.params.date;
    console.log(1)
    let results;
    try{
        const cacheResults=await client.get(`weather:${location}:${date}`)
        console.log(2)
        if(cacheResults){
            results=JSON.parse(cacheResults);
            res.send({
                fromCache:true,
                data:results,
            });
            console.log(3)
        }else{
            console.log(4)
            next();
        }
    }catch(error){
        console.error(error);
        res.status(404);
    }
}

module.exports={cacheData}