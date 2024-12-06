"use client";

import React, { useState } from "react";
import { useMovies } from "@/lib/hooks/useMovies";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function MovieList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { movies, loading, error } = useMovies(searchQuery);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="w-full max-w-6xl">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {loading ? (
        <LoadingSpinner />
      ) : movies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No movies found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}