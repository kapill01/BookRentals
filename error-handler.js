const errorHandlerMiddleWare=(err,req,res,next)=>{
    console.log(err);
    console.log('hi');
    return res.status(500).send('Something Went wrong');
}

module.exports=errorHandlerMiddleWare;