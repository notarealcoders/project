"use client";

import { useEffect, useState } from "react";
import { IMovie } from "@/lib/mongodb/types/movie";

export default function MovieList() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchMovies(search?: string) {
    try {
      const url = search
        ? `/api/movies?search=${encodeURIComponent(search)}`
        : "/api/movies";

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("data: ", data);

      if (!data.movies || !Array.isArray(data.movies)) {
        throw new Error("Invalid data format received");
      }

      setMovies(data.movies);
      setError("");
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchQuery);
  }, [searchQuery]);

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {loading ? (
        <div className="w-full text-center py-8">
          <div className="animate-pulse text-lg">Loading movies...</div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No movies found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Year: {movie.year}
              </p>
              <p className="text-gray-700 dark:text-gray-200">{movie.plot}</p>
              {movie.directors && movie.directors.length > 0 && (
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Director(s): {movie.directors.join(", ")}
                </p>
              )}
              {movie.cast && movie.cast.length > 0 && (
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Cast: {movie.cast.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
