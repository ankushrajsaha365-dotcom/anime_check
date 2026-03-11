'use client';

import { useEffect, useState } from 'react';
import { getTrendingAnime } from '@/lib/api-utils';
import { AnimeBasic } from '@/lib/types';
import AnimeCard from './anime-card';

export default function TrendingSection() {
  const [trending, setTrending] = useState<AnimeBasic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);
        const data = await getTrendingAnime();
        setTrending(data);
        setError(null);
      } catch (err) {
        setError('Failed to load trending anime');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Trending Now</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg bg-zinc-800 h-80"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-900 bg-red-950 p-4 text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Trending Now</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trending.slice(0, 8).map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
