const express=require('express');
const router=express.Router();

const {getAllBooks,updateBook,createBook,getBook,deleteBook}=require('../controllers/book-controllers');

router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports=router;