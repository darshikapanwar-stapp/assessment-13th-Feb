import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "./booksThunk";
import { clearBooksCache } from "./booksSlice";
import Card from "../../components/Card";

const BooksPage = () => {
const dispatch = useDispatch();

  const { data, loading, error, isCached } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          📚 Harry Potter Books
        </h1>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => dispatch(clearBooksCache())}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear Cache
          </button>
        </div>

        {loading && (
          <p className="text-center text-lg font-semibold">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 font-semibold">
            Error: {error}
          </p>
        )}

        {isCached && !loading && (
          <p className="text-center text-green-600 mb-4">
            ⚡ Data Loaded From Cache
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((book, index) => (
            <Card key={index}>
              <h2 className="text-xl font-bold mb-2">
                {book.title}
              </h2>

              <p className="text-gray-700 mb-2">
                <strong>Release Date:</strong>{" "}
                {book.releaseDate}
              </p>

              <p className="text-gray-700">
                <strong>Description:</strong>{" "}
                {book.description?.substring(0, 120)}...
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
