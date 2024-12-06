import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          CodeShare
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link
            href="/new"
            className="text-gray-600 hover:text-gray-900"
          >
            New Session
          </Link>
        </div>
      </nav>
    </header>
  );
}