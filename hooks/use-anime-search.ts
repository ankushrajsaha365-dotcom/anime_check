'use client';

import { useState, useCallback } from 'react';
import { searchAnime } from '@/lib/api-utils';
import { AnimeBasic, SearchFilters } from '@/lib/types';

export function useAnimeSearch() {
  const [results, setResults] = useState<AnimeBasic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (query: string, filters?: Partial<SearchFilters>) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const results = await searchAnime(query, filters);
      setResults(results);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search anime. Please try again.');
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    results,
    isLoading,
    error,
    hasSearched,
    search,
  };
}
