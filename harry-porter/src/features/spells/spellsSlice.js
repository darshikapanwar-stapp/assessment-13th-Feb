import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: {},
  loading: false,
  error: null,
  currentPage: 1,
  totalPerPage: 10,
  totalPages: 10, //  Added for numbered pagination
};

const spellsSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {
    fetchSpellsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSpellsSuccess: (state, action) => {
      const { page, data } = action.payload;
      state.loading = false;
      state.pages[page] = data;
    },
    fetchSpellsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSpellsCache: (state) => {
      state.pages = {};
    },
  },
});

export const {
  fetchSpellsStart,
  fetchSpellsSuccess,
  fetchSpellsFailure,
  setCurrentPage,
  clearSpellsCache,
} = spellsSlice.actions;

export default spellsSlice.reducer;
