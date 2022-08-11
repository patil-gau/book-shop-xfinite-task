const redis = require('redis');

const { REDIS_HOST } = process.env;
const REDIS_PORT = process.env.REDIS_PORT || 6379



const client = redis.createClient({REDIS_HOST,REDIS_PORT});


client.on('error',(err)=>{
        console.log(`[ERROR] Error connecting to redis ${err}`);
});

client.on('ready',()=>{
        console.log(`[INFO] Connected to Redis`);
})







// const test = async()=>{
//         getAsync = promisify(client.get).bind(client);
//         setAsync = promisify(client.set).bind(client);
       
//         await client.setAsync("name","gautam"); 
//         const data = await client.getAsync("name");
// console.log(data);
// }

  




// test()
   
module.exports = client;
