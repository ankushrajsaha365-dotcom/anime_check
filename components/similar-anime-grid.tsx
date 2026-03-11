import { AnimeBasic } from '@/lib/types';
import AnimeCard from './anime-card';

interface SimilarAnimeGridProps {
  animeList: AnimeBasic[];
  title?: string;
}

export default function SimilarAnimeGrid({
  animeList,
  title = 'Similar Anime',
}: SimilarAnimeGridProps) {
  if (!animeList || animeList.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {animeList.slice(0, 8).map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
