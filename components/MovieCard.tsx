import React from 'react';
import { IMovie } from '@/lib/mongodb/types/movie';

interface MovieCardProps {
  movie: IMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
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
  );
}