import {
  fetchSpellsStart,
  fetchSpellsSuccess,
  fetchSpellsFailure,
} from "./spellsSlice";

import { fetchData } from "../../services/api";

export const fetchSpells = (page) => async (dispatch, getState) => {
  const { spells } = getState();

  // Checking if this page is already cached
  if (spells.pages[page]) {
    console.log(`Using cached data for page ${page}`);
    return;
  }

  try {
    dispatch(fetchSpellsStart());

    const data = await fetchData("spells", "en", {
      max: spells.totalPerPage,
      page: page,
    });

    dispatch(fetchSpellsSuccess({ page, data }));
  } catch (error) {
    dispatch(fetchSpellsFailure(error.message));
  }
};
