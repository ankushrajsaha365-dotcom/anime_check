'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  getAnimeById,
  getAnimeRelations,
  getAnimesByGenre,
} from '@/lib/api-utils';
import { Anime, AnimeBasic } from '@/lib/types';
import Navbar from '@/components/navbar';
import SeriesTimeline from '@/components/series-timeline';
import SimilarAnimeGrid from '@/components/similar-anime-grid';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, TrendingUp, Users } from 'lucide-react';

export default function AnimeDetailPage() {
  const params = useParams();
  const animeId = parseInt(params.id as string);

  const [anime, setAnime] = useState<Anime | null>(null);
  const [relations, setRelations] = useState([]);
  const [similarAnime, setSimilarAnime] = useState<AnimeBasic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const animeData = await getAnimeById(animeId);
        setAnime(animeData);

        // Fetch relations
        try {
          const relationsData = await getAnimeRelations(animeId);
          setRelations(relationsData || []);
        } catch {
          console.log('No relations found');
        }

        // Fetch similar anime from the first genre
        if (animeData.genres && animeData.genres.length > 0) {
          try {
            const similarData = await getAnimesByGenre(animeData.genres[0].mal_id);
            setSimilarAnime(
              similarData.filter((a) => a.mal_id !== animeId)
            );
          } catch {
            console.log('Failed to fetch similar anime');
          }
        }

        setError(null);
      } catch (err) {
        setError('Failed to load anime details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [animeId]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="animate-pulse space-y-8">
              <div className="h-96 rounded-lg bg-zinc-800" />
              <div className="space-y-4">
                <div className="h-8 rounded bg-zinc-800 w-1/3" />
                <div className="h-4 rounded bg-zinc-800 w-2/3" />
                <div className="h-4 rounded bg-zinc-800 w-1/2" />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !anime) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to search
            </Link>

            <div className="rounded-lg border border-red-900 bg-red-950 p-8 text-center text-red-200">
              {error || 'Anime not found'}
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Back button */}
        <div className="border-b border-zinc-800 bg-black px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to search
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="border-b border-zinc-800 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Poster */}
              <div className="lg:col-span-1">
                <div className="relative h-96 overflow-hidden rounded-lg shadow-xl shadow-purple-500/20">
                  <Image
                    src={
                      anime.images.jpg.large_image_url ||
                      anime.images.jpg.image_url
                    }
                    alt={anime.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-6 lg:col-span-2">
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    {anime.title}
                  </h1>
                  {anime.synopsis && (
                    <p className="mt-4 text-zinc-300 leading-relaxed">
                      {anime.synopsis}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {anime.score && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                      <div className="flex items-center gap-2 text-yellow-400 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-semibold">Rating</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {anime.score.toFixed(2)}/10
                      </p>
                      {anime.scored_by && (
                        <p className="text-xs text-zinc-400 mt-1">
                          {(anime.scored_by / 1000).toFixed(0)}K votes
                        </p>
                      )}
                    </div>
                  )}

                  {anime.aired && anime.aired.from && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                      <div className="flex items-center gap-2 text-blue-400 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-semibold">Aired</span>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {new Date(anime.aired.from).getFullYear()}
                      </p>
                      {anime.aired.to && (
                        <p className="text-xs text-zinc-400 mt-1">
                          to {new Date(anime.aired.to).getFullYear()}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-semibold">Type</span>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {anime.type}
                    </p>
                    {anime.episodes && (
                      <p className="text-xs text-zinc-400 mt-1">
                        {anime.episodes} episodes
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="flex items-center gap-2 text-pink-400 mb-1">
                      <span className="text-sm font-semibold">Status</span>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {anime.status}
                    </p>
                  </div>
                </div>

                {/* Genres */}
                {anime.genres && anime.genres.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-2">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {anime.genres.map((genre) => (
                        <span
                          key={genre.mal_id}
                          className="rounded-full bg-purple-900 px-3 py-1 text-sm text-purple-200"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Studios */}
                {anime.studios && anime.studios.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 mb-2">
                      Studios
                    </h3>
                    <p className="text-white">
                      {anime.studios.map((s) => s.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-12">
            {/* Series Timeline */}
            {relations.length > 0 && (
              <SeriesTimeline relations={relations} />
            )}

            {/* Similar Anime */}
            {similarAnime.length > 0 && (
              <SimilarAnimeGrid animeList={similarAnime} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
