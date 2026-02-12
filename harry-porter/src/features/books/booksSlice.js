import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  isCached: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isCached = true;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearBooksCache: (state) => {
      state.data = [];
      state.isCached = false;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  clearBooksCache,
} = booksSlice.actions;

export default booksSlice.reducer;
