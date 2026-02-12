import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Navbar from "./components/Navbar";
import BooksPage from "./features/books/BooksPage";
import SpellsPage from "./features/spells/SpellsPage";
import CharactersPage from "./features/characters/CharactersPage";
import HousesPage from "./features/houses/HousesPage";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/spells" element={<SpellsPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/houses" element={<HousesPage />} />
      </Routes>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
};

export default App;
