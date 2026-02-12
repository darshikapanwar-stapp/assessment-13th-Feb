import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import spellsReducer from "../features/spells/spellsSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    spells: spellsReducer,
  },
  devTools: true,
});
