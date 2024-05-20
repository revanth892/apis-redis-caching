const axios =require('axios');
const client = require('../config/redisclient');

const API_KEY ='WH9SSET654HBCPX5C67498R2K'

const fetchDetails =async(location,date)=>{
    // const location = 'hyderabad'
    // const date= '2017-02-03'
    try{
        console.log(7)

        // const apiResponse = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=${API_KEY}`);
        const apiResponse={data:{
            hello:"hi"
        }}
        console.log(apiResponse)
        console.log('---------------------------------------------------------------------------------------------------------------------')
        return apiResponse
    }
    catch(error){
        console.error("Error fetching daata from APT",error)
        throw error;
    }
}

const getTheWeather =async(req,res)=>{
        const location = req.params.location;
        const date =req.params.date;
        let results;
        console.log(5)
        try{
            results = await fetchDetails(location,date);
            if(!results)
            {
                console.log(6)

                res.status(400).json({message:"there is no error"})
            }
            // console.log(results.data)
            // results=JSON.stringify(results)
            console.log('---------------------------------------------------------------------------------------------------------------------')
            // console.log(results)
            let thedata =JSON.stringify(results.data)
            await client.set(`weather:${location}:${date}`,thedata,'EX',60,'NX');
            console.log(8)
            
            res.send({
                fromCache: false,
                data: JSON.parse(thedata)
            });

        }
        catch(error) {
            console.error(error);
            res.status(404).send("Data unavailabe")
        }
}

module.exports={getTheWeather};