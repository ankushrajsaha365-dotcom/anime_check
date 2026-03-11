import { Anime, AnimeBasic, JikanResponse, SearchFilters } from './types';

const JIKAN_API = 'https://api.jikan.moe/v4';
const CACHE_DURATION = 3600000; // 1 hour

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

async function getCachedFetch(url: string) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

export async function getTrendingAnime(page: number = 1) {
  const url = `${JIKAN_API}/anime?order_by=score&sort=desc&status=complete&limit=25&page=${page}`;
  const response: JikanResponse<Anime> = await getCachedFetch(url);
  return response.data;
}

export async function searchAnime(
  query: string,
  filters: Partial<SearchFilters> = {},
  page: number = 1
) {
  let url = `${JIKAN_API}/anime?query=${encodeURIComponent(query)}&limit=25&page=${page}`;

  if (filters.genres?.length) {
    url += `&genres=${filters.genres.join(',')}`;
  }
  if (filters.status && filters.status !== 'all') {
    url += `&status=${filters.status}`;
  }
  if (filters.type && filters.type !== 'all') {
    url += `&type=${filters.type}`;
  }

  const orderBy = filters.orderBy || 'score';
  const sort = filters.sort || 'desc';
  url += `&order_by=${orderBy}&sort=${sort}`;

  if (filters.minScore) {
    url += `&min_score=${filters.minScore}`;
  }

  const response: JikanResponse<Anime> = await getCachedFetch(url);
  return response.data;
}

export async function getAnimeById(id: number) {
  const url = `${JIKAN_API}/anime/${id}/full`;
  const response = await getCachedFetch(url);
  return response.data as Anime;
}

export async function getAnimeCharacters(id: number) {
  const url = `${JIKAN_API}/anime/${id}/characters`;
  const response = await getCachedFetch(url);
  return response.data;
}

export async function getAnimeRelations(id: number) {
  const url = `${JIKAN_API}/anime/${id}/relations`;
  const response = await getCachedFetch(url);
  return response.data;
}

export async function getAnimesByGenre(genreId: number, page: number = 1) {
  const url = `${JIKAN_API}/anime?genres=${genreId}&order_by=score&sort=desc&limit=25&page=${page}`;
  const response: JikanResponse<Anime> = await getCachedFetch(url);
  return response.data;
}

export async function getSeasonAnime(year: number, season: string) {
  const url = `${JIKAN_API}/seasons/${year}/${season.toLowerCase()}`;
  const response = await getCachedFetch(url);
  return response.data as AnimeBasic[];
}

// Genre list
export const GENRES = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 5, name: 'Shounen' },
  { id: 7, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Psychological' },
  { id: 36, name: 'Shoujo' },
  { id: 37, name: 'Slice of Life' },
  { id: 40, name: 'Shoujo Ai' },
  { id: 41, name: 'Shounen Ai' },
  { id: 43, name: 'Thriller' },
  { id: 44, name: 'Vampire' },
  { id: 46, name: 'Shounen' },
  { id: 48, name: 'School' },
  { id: 50, name: 'Seinen' },
];

export const STATUSES = [
  { value: 'all', label: 'All Status' },
  { value: 'complete', label: 'Complete' },
  { value: 'airing', label: 'Airing' },
  { value: 'upcoming', label: 'Upcoming' },
];

export const TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
];
