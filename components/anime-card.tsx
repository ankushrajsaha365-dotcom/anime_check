import { AnimeBasic } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface AnimeCardProps {
  anime: AnimeBasic;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <div className="group relative overflow-hidden rounded-lg bg-zinc-900 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
        <div className="relative h-64 overflow-hidden bg-zinc-800">
          <Image
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={anime.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        
        <div className="relative p-4">
          <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
            {anime.title}
          </h3>
          
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
            <span className="rounded bg-zinc-800 px-2 py-1">{anime.type}</span>
            {anime.score && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-white">{anime.score.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          {anime.year && (
            <p className="mt-2 text-xs text-zinc-500">{anime.year}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
