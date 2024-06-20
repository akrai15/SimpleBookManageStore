import Book from '../models/book.model.js';
import mongoose from 'mongoose';


export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error in getting books" });
    }
}
export const getOneBook = async (req, res) => {
    try {
        const id=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error in getting  one book" });
    }
}
export const addBook = async (req, res) => {
    try{
        const {title,author,publishYear,price,genre}=req.body;
        if(!title || !author  || !publishYear || !price ){
            return res.status(400).json({message:"Please fill all fields"});
        }
        if(price<0 || publishYear<0){
            return res.status(400).json({message:"Price and publish year must be positive"});
        }
        const newBook = new Book({
            title,
            author,
            
            publishYear,
            price,
            
        });
        if(genre){
            newBook.genre=genre;
        }
        await newBook.save();
        return res.status(200).json({Success:"Book added successfully"});


    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Server error in adding book"});
    }

}
export const updateBook = async (req, res) => {
    try{
        try {
            const { title, author, publishYear, price, genre } = req.body;
            const bookId = req.params.id;
    
            // Validate bookId to ensure it is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(bookId)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }
    
            const book = await Book.findById(bookId);
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }
    
            // Update fields only if they are provided in the request body
            book.title = title !== undefined ? title : book.title;
            book.author = author !== undefined ? author : book.author;
            book.publishYear = publishYear !== undefined ? publishYear : book.publishYear;
            book.price = price !== undefined ? price : book.price;
            if (genre !== undefined) {
                book.genre = genre;
            }
    
            await book.save();
            return res.status(200).json({ Success: "Book updated successfully", book });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error in updating the book" });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Server error in updating book"});
    }
}


export const deleteBook = async (req, res) => {
    try{
        const bookId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).json({message:"Invalid ID format"});
        }
        const book=await Book.findById(bookId);
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        await Book.findByIdAndDelete(bookId);
        return res.status(200).json({Success:"Book deleted successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Server error in deleting book"});
    }   
}
