const Book=require('../model/books');
const {createCustomError}=require('../custom-error/custom-error-handler')
const getAllBooks= async(req,res)=>{
  // console.log(req.query);
    const {name,author,section,genre,sort,fields,numericFilters} = req.query;
  
    const queryObject={};
    if(name){
      queryObject.name={$regex:name,$options:'i'};
    }
    if(author){
      queryObject.author={$regex:author,$options:'i'};
    }
    if(section){
      queryObject.section={$regex:section,$options:'i'};
    }
    if(genre){
      queryObject.genre={$regex:genre,$options:'i'};
    }
    // console.log('heyyy');
    if (numericFilters) {
        const operatorMap = {
          '>': '$gt',
          '>=': '$gte',
          '=': '$eq',
          '<': '$lt',
          '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        const options = ['available_copies','rental_fee','rating','rented','total'];
        filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            if(!queryObject[field])
            queryObject[field] = { [operator]: Number(value) };
            else  queryObject[field][operator]=Number(value);
          }
        });
      }
      // console.log(queryObject);
      let result=Book.find(queryObject);
      if(sort){
        const sortList=sort.split(',').join(' ');
        result=result.sort(sortList);
      }
      else{
        result=result.sort('published_on');
      }
      if(fields){
        const fieldList=fields.split(',').join(' ');
        result=result.select(fieldList);
      }
      // console.log('youu');
      const page=Number(req.query.page)||1;
      const limit=Number(req.query.limit)||6;
      const skip=(page-1)*limit;
      // console.log('buir');
      result=result.skip(skip).limit(limit);
      const books=await result;
      res.status(200).json({books,nbHits:books.length});
// const books=await Book.find({});
// res.status(200).json({books});
}

const createBook= async(req,res)=>{
    
    const book= await Book.create(req.body);
    // console.log(book);
    // res.status(200).json({'req':req.body})
    res.status(201).json({book});
}
const getBook= async(req,res)=>{
  // console.log('hi');
   const book=await Book.findOne({_id:req.params.id});
   if(!book){
    return next(createCustomError(`No task with id: ${req.params.id}`,404));
   }
   res.status(200).json({book});
}
const updateBook= async(req,res)=>{
    const {id:bookID}=req.params;
    const book=await Book.findByIdAndUpdate({_id:bookID},req.body,{
      new:true,runValidators:true
    });
    if(!book){
      return next(createCustomError(`No task with id: ${req.params.id}`,404));
     }
     res.status(200).json({book});

}

const deleteBook= async(req,res)=>{
    const book=await Book.findOneAndDelete({_id:req.params.id})
    if(!book){
      return next(createCustomError(`No task with id: ${req.params.id}`,404));
     }
     res.status(200).json({book});
}

module.exports={createBook,getAllBooks,getBook,updateBook,deleteBook};
