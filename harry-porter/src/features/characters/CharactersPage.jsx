import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../../services/api";

const CharactersPage = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["characters", search],
    queryFn: () =>
      fetchData("characters", "en", search ? { search } : {}),
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });


  const prefetchCharacters = () => {
    queryClient.prefetchQuery({
      queryKey: ["characters", "Harry"],
      queryFn: () =>
        fetchData("characters", "en", { search: "Harry" }),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          🧙 Characters (React Query)
        </h1>

        <div className="flex justify-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search character..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-64"
          />

          <button
            onClick={prefetchCharacters}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Prefetch Harry
          </button>
        </div>

        {isLoading && (
          <p className="text-center font-semibold">Loading...</p>
        )}

        {isError && (
          <p className="text-center text-red-500">
            Error: {error.message}
          </p>
        )}

        {isFetching && !isLoading && (
          <p className="text-center text-blue-500">
            Updating...
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((character, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold mb-2">
                {character.fullName}
              </h2>
              <p>
                <strong>Nickname:</strong>{" "}
                {character.nickname || "N/A"}
              </p>
              <p>
                <strong>House:</strong>{" "}
                {character.hogwartsHouse || "Unknown"}
              </p>
              <p>
                <strong>Actor:</strong>{" "}
                {character.interpretedBy || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;
