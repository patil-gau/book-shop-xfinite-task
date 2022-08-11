const Book = require('../models/book.js');
const redisClient = require('../config/redisClient');

//make connection with redis client
(async function (){ await redisClient.connect()})();

exports.getBooks = async(req,res,next)=>{
   const BOOKS_LIMIT = 10;
   const defaultOffset = 0;
   const response = {
        status :0,
        msg : "",
        data : {}
   }

   try {
        //grab the limit and offset
        let {limit,offset} = req.query;

        //if no limit and offset is provided then use default offset
        if(!limit){      
            limit = BOOKS_LIMIT;
        }
        if(!offset){
            offset = defaultOffset;
        }

        //both offset and limit should be positive numbers
        if(!(limit>0 && offset>=0)){
            response.msg = "limit should be greater than 0 and offset should be non-negative"
            return res.status(400).json(response);
        }

        // if limit provided by user is more than max limit then don't send data more than max limit
        if(limit>BOOKS_LIMIT){
            limit = BOOKS_LIMIT;
          }

        //check if the data is available in redis cache    
        const cachedData = await redisClient.get(offset.toString());  
        if(cachedData){
            console.log(`[INFO] Retrieving values from Cache`);
            const data = JSON.parse(cachedData);
            response.data = data;
            response.status = 1;
            return res.status(200).json(response);
        }
        else
         {
            console.log(`[INFO] Data not cached`);
         }      

        //get the data from database
        const books = await Book.find().sort({_id:1}).skip(offset).limit(limit);
        let key = offset.toString();
        let value = JSON.stringify(books);

        //store books in cache and set expiry to 30 mins
        await redisClient.setEx(key,1800,value);

        response.data = books;
        response.status = 1;
        response.msg = "Success";
        return res.status(200).json(response);
        
   } catch (error) {
      console.log(`[ERROR] ${String(error)}`);
      response.msg = "Failed to load data. Please try again"
      return  res.status(500).json(response);
   }
}