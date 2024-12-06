import MovieList from '@/components/MovieList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Movies Database</h1>
      <MovieList />
    </main>
  );
}