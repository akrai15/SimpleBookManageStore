import { useState, useEffect } from "react";
import axios from "axios";
import  useBooks  from "../zustand/useBooks.js";

const useGetBooks = () => {
  const [loading, setLoading] = useState(true);
  const { setBooks } = useBooks();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setBooks]); // Dependency array should include setBooks

  return { loading };
};

export default useGetBooks;
