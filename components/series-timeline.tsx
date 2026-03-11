import { Anime } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface SeriesTimelineProps {
  relations: Array<{
    entry: {
      mal_id: number;
      title: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
      type: string;
      year?: number;
    };
    relation: string;
  }>;
}

const relationTypeColors: Record<string, string> = {
  Prequel: 'from-blue-500 to-blue-600',
  Sequel: 'from-purple-500 to-purple-600',
  'Side story': 'from-green-500 to-green-600',
  'Full story': 'from-pink-500 to-pink-600',
  'Spin-off': 'from-orange-500 to-orange-600',
  'Alternative setting': 'from-cyan-500 to-cyan-600',
  'Alternative version': 'from-yellow-500 to-yellow-600',
  Other: 'from-gray-500 to-gray-600',
};

export default function SeriesTimeline({ relations }: SeriesTimelineProps) {
  if (!relations || relations.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Series Timeline</h3>
        <p className="text-zinc-400">No related anime found.</p>
      </div>
    );
  }

  // Sort by relation type to group them
  const sortedRelations = [...relations].sort(
    (a, b) => a.relation.localeCompare(b.relation)
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Series Timeline</h3>
      <div className="space-y-4">
        {sortedRelations.map((item, index) => {
          const gradientClass =
            relationTypeColors[item.relation] ||
            relationTypeColors.Other;

          return (
            <div key={index} className="flex gap-4">
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 rounded-full bg-gradient-to-br ${gradientClass}`}
                />
                {index < sortedRelations.length - 1 && (
                  <div className="my-2 h-8 w-0.5 bg-zinc-700" />
                )}
              </div>

              {/* Content */}
              <Link
                href={`/anime/${item.entry.mal_id}`}
                className="group flex-1 rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex gap-4">
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.entry.images.jpg.image_url}
                      alt={item.entry.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-purple-400 mb-1">
                      {item.relation}
                    </p>
                    <h4 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                      {item.entry.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-400">
                      {item.entry.type}
                      {item.entry.year && ` • ${item.entry.year}`}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
