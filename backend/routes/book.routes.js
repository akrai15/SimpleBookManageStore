import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import {getBooks,getOneBook,addBook,updateBook,deleteBook} from '../controllers/book.controller.js';


const router = express.Router();

router.get('/',getBooks);
router.get('/:id',getOneBook);
router.post('/add',protectRoute,addBook);
router.put('/update/:id',protectRoute,updateBook);
router.delete('/delete/:id',protectRoute,deleteBook);

export default router;
