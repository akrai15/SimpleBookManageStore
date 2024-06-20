import { create } from "zustand";

const useBooks = create((set) => ({
  books: [],
  setBooks: (books) => set({ books }),
}));

export default useBooks;
