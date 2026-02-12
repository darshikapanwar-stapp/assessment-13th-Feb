import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../../services/api";

const HousesPage = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["houses"],
    queryFn: () => fetchData("houses"),
    staleTime: 1000 * 60 * 5, // 5 min fresh
    cacheTime: 1000 * 60 * 10, // 10 min in memory
    refetchOnWindowFocus: true,
  });

  // Invalidate Cache
  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["houses"] });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          🏰 Hogwarts Houses
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleInvalidate}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Invalidate Cache
          </button>

          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Manual Refetch
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
            Updating in background...
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data?.map((house, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold mb-2">
                {house.house}
              </h2>

              <p>
                <strong>Founder:</strong> {house.founder}
              </p>

              <p>
                <strong>Animal:</strong> {house.animal}
              </p>

              <p>
                <strong>Colors:</strong>{" "}
                {house.colors?.join(", ")}
              </p>

              <p>
                <strong>Element:</strong> {house.element}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HousesPage;
