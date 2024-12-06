import { IMovie } from '@/lib/mongodb/types/movie';

export async function fetchMovies(search?: string): Promise<IMovie[]> {
  const url = search
    ? `/api/movies?search=${encodeURIComponent(search)}`
    : "/api/movies";

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data.movies || !Array.isArray(data.movies)) {
    throw new Error("Invalid data format received");
  }

  return data.movies;
}