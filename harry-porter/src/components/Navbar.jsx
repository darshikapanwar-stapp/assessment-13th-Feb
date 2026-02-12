import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyle =
    "px-4 py-2 rounded hover:bg-purple-600 transition";

  return (
    <nav className="bg-purple-700 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          🧙 Harry Potter Wiki
        </h1>

        <div className="flex gap-4">
          <NavLink to="/books" className={linkStyle}>
            Books
          </NavLink>

          <NavLink to="/spells" className={linkStyle}>
            Spells
          </NavLink>

          <NavLink to="/characters" className={linkStyle}>
            Characters
          </NavLink>

          <NavLink to="/houses" className={linkStyle}>
            Houses
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
