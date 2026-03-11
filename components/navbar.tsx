import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
            <span className="text-xl font-bold text-white">AnimeFinder</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Discover
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Trending
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
