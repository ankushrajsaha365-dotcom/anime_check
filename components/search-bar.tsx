'use client';

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search anime...',
  isLoading = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      // Debounce the search with a 500ms delay
      const timer = setTimeout(() => {
        if (value.trim()) {
          onSearch(value);
        }
      }, 500);
      return () => clearTimeout(timer);
    },
    [onSearch]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 pl-10 pr-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-purple-500 focus:outline-none"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}
