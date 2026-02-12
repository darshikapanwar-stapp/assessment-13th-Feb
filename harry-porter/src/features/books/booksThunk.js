import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
} from "./booksSlice";

import { fetchData } from "../../services/api";

export const fetchBooks = () => async (dispatch, getState) => {
  const { books } = getState();

  //Manual Cache Check
  if (books.isCached && books.data.length > 0) {
    console.log("Using cached books data");
    return;
  }

  try {
    dispatch(fetchBooksStart());

    const data = await fetchData("books");

    dispatch(fetchBooksSuccess(data));
  } catch (error) {
    dispatch(fetchBooksFailure(error.message));
  }
};
