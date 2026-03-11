// Types for Jikan API responses
export interface AnimeBasic {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  year?: number;
  score?: number;
  scored_by?: number;
  type: string;
  episodes?: number;
  status: string;
  airing: boolean;
}

export interface Anime extends AnimeBasic {
  source?: string;
  aired: {
    from: string;
    to: string | null;
  };
  season?: string;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  studios: Array<{
    mal_id: number;
    name: string;
    type: string;
    url: string;
  }>;
  synopsis?: string;
  duration?: string;
  rating?: string;
}

export interface SearchFilters {
  genres: number[];
  status: string;
  type: string;
  orderBy: string;
  sort: string;
  minScore: number;
}

export interface JikanResponse<T> {
  data: T[];
  pagination?: {
    last_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface RelatedAnime {
  entry: AnimeBasic;
  relation: string;
}
