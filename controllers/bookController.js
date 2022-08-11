const Book = require('../models/book.js');

exports.getBooks = async(req,res,next)=>{
   const BOOKS_LIMIT = 10;
   const defaultOffset = 1;
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
        if(!(limit>0 && offset>0)){
            response.msg = "limit and offset should be greater than 0"
            return res.status(400).json(response);
        }

        // if limit provided by user is more than max limit then don't send data more than max limit
        if(limit>BOOKS_LIMIT){
            limit = BOOKS_LIMIT;
          }
        
        //get the data from database
        const books = await Book.find().sort({_id:1}).skip(offset-1).limit(limit);

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