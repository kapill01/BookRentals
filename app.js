const express=require('express');
const app=express();
const connectDB=require('./db/connect');
require('dotenv').config();
require('express-async-errors');
const bookRouter=require('./routes/book-routes');
const notFound=require('./middleware/notFound');
const errorHandlerMiddleWare=require('./error-handler');

//
app.use(express.static('./public'))
app.use(express.json());

//routes

app.use('/api/v1/books',bookRouter);
app.use(notFound);
app.use(errorHandlerMiddleWare);

port=process.env.PORT||4000;

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>console.log(`Server listening on port ${port}`));
    }catch(err){
        console.log(err);
    }
}

start();


