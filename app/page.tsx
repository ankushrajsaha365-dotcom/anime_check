'use client';

import { useState } from 'react';
import { SearchFilters } from '@/lib/types';
import Navbar from '@/components/navbar';
import SearchBar from '@/components/search-bar';
import SidebarFilter from '@/components/sidebar-filter';
import AnimeCard from '@/components/anime-card';
import TrendingSection from '@/components/trending-section';
import { useAnimeSearch } from '@/hooks/use-anime-search';

export default function Home() {
  const { results, isLoading, error, hasSearched, search } = useAnimeSearch();
  const [currentQuery, setCurrentQuery] = useState('');
  const [filters, setFilters] = useState<Partial<SearchFilters>>({});

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    search(query, filters);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(newFilters);
    if (currentQuery.trim()) {
      search(currentQuery, newFilters);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-black px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Discover Your Next Favorite Anime
              </h1>
              <p className="mt-4 text-lg text-zinc-400">
                Search through thousands of anime, filter by genres, status, and more
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {!hasSearched ? (
              <TrendingSection />
            ) : (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1">
                  <SidebarFilter onFilterChange={handleFilterChange} />
                </div>

                {/* Results */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Results for "{currentQuery}"
                    </h2>
                    <p className="mt-2 text-zinc-400">
                      {results.length > 0
                        ? `Found ${results.length} anime`
                        : 'No results found'}
                    </p>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-red-900 bg-red-950 p-4 text-red-200">
                      {error}
                    </div>
                  )}

                  {isLoading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse rounded-lg bg-zinc-800 h-80"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {results.map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                      ))}
                    </div>
                  )}

                  {!isLoading && results.length === 0 && hasSearched && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center">
                      <p className="text-zinc-400">
                        No anime found. Try a different search term or adjust your filters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
