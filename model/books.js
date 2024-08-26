const mongoose=require('mongoose');

const BookSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Book name cannot be empty'],
        // maxlength:[70,'Book\'s name cannot be longer than 30 characters'],
        trim:true,
        unique:true
    },
    author:{
        type:String,
        default:"_",
        maxlength:[25,'Author\'s name cannot be longer than 25 characters'],
        trim:true
    },
    section:{
        type:String,
        required:[true,'section name cannot be empty'],
        enum: ['Literature','Physics','Mathematics','C.S.E.','Chemistry'],
        maxlength:[25,'section name cannot be longer than 25 characters'],
        trim:true
    },
    genre:{
        type:String,
        enum:{
            values:['Horror','Romance','Novel','Sci-Fi'],
            message:'{VALUE} genre is not supported',
        },
        maxlength:[25,'genre name cannot be longer than 25 characters'],
        trim:true
    },
    available_copies:{
        type:Number,
        required:[true,'quantity of books should be known'],
        min:[0,'Books cannot be negative']
    },
    rental_fee:{
        type:Number,
        required:[true,'Rental fee should be present'],
        min:[50,'Too cheap']
    },
    rating:{
        type:Number,
        default:4.5,
        max:[5,'Rating cannot exceed 5']
    },
    rented:{
        type:Number,
        default:0,
        min:[0,'Book cannot be rented negative times']
    },
    total:{
        type:Number,
        required:[true,'Total by absent'],
        min:[0,'Total cannot be negative']
    },
    published_On:{
        type: Date,
    default: Date.now(),
    }
})

module.exports=mongoose.model('Book',BookSchema);