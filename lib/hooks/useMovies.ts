import { useState, useEffect } from 'react';
import { IMovie } from '@/lib/mongodb/types/movie';
import { fetchMovies } from '@/lib/api/movieApi';

export function useMovies(searchQuery: string) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadMovies() {
      try {
        setLoading(true);
        const fetchedMovies = await fetchMovies(searchQuery);
        
        if (isMounted) {
          setMovies(fetchedMovies);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch movies");
          setMovies([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  return { movies, loading, error };
}