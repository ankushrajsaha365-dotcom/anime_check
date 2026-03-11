'use client';

import { useState } from 'react';
import { GENRES, STATUSES, TYPES } from '@/lib/api-utils';
import { SearchFilters } from '@/lib/types';

interface SidebarFilterProps {
  onFilterChange: (filters: Partial<SearchFilters>) => void;
}

export default function SidebarFilter({ onFilterChange }: SidebarFilterProps) {
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    genres: [],
    status: 'all',
    type: 'all',
    orderBy: 'score',
    sort: 'desc',
    minScore: 0,
  });

  const handleGenreToggle = (genreId: number) => {
    const newGenres = filters.genres?.includes(genreId)
      ? filters.genres.filter((id) => id !== genreId)
      : [...(filters.genres || []), genreId];

    const newFilters = { ...filters, genres: newGenres };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTypeChange = (type: string) => {
    const newFilters = { ...filters, type };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleOrderChange = (orderBy: string) => {
    const newFilters = { ...filters, orderBy };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleScoreChange = (score: number) => {
    const newFilters = { ...filters, minScore: score };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Status</h3>
        <div className="space-y-2">
          {STATUSES.map((status) => (
            <label key={status.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={filters.status === status.value}
                onChange={() => handleStatusChange(status.value)}
                className="h-4 w-4 rounded border-zinc-600 text-purple-500"
              />
              <span className="text-sm text-zinc-400 hover:text-white transition-colors">
                {status.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Type</h3>
        <div className="space-y-2">
          {TYPES.map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type.value}
                checked={filters.type === type.value}
                onChange={() => handleTypeChange(type.value)}
                className="h-4 w-4 rounded border-zinc-600 text-purple-500"
              />
              <span className="text-sm text-zinc-400 hover:text-white transition-colors">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Order By</h3>
        <select
          value={filters.orderBy || 'score'}
          onChange={(e) => handleOrderChange(e.target.value)}
          className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="score">Score</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
          <option value="airing_date">Airing Date</option>
        </select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">
          Min. Score: {filters.minScore}
        </h3>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={filters.minScore || 0}
          onChange={(e) => handleScoreChange(parseFloat(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-white">Genres</h3>
        <div className="space-y-2">
          {GENRES.slice(0, 10).map((genre) => (
            <label key={genre.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.genres?.includes(genre.id) || false}
                onChange={() => handleGenreToggle(genre.id)}
                className="h-4 w-4 rounded border-zinc-600 text-purple-500"
              />
              <span className="text-sm text-zinc-400 hover:text-white transition-colors">
                {genre.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
