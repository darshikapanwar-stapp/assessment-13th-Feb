import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  clearSpellsCache,
} from "./spellsSlice";
import { fetchSpells } from "./spellsThunk";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

const SpellsPage = () => {
  const dispatch = useDispatch();

  const {
    pages,
    loading,
    error,
    currentPage,
    totalPages,
  } = useSelector((state) => state.spells);

  const currentData = pages[currentPage] || [];

  useEffect(() => {
    dispatch(fetchSpells(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          ✨ Spells 
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => dispatch(clearSpellsCache())}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear Cache
          </button>
        </div>

        {loading && (
          <p className="text-center text-lg font-semibold">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500">
            Error: {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.map((spell, index) => (
            <Card key={index}>
              <h2 className="text-xl font-bold mb-2">
                {spell.spell}
              </h2>

              <p>
                <strong>Description:</strong> {spell.use}
              </p>
            </Card>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SpellsPage;
