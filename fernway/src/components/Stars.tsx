import type { ReactElement } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarsProps {
  rating: number;
  reviews: number;
}

// Read-only rating with half-star precision. Per-star literal classes keep
// every style in Tailwind utilities (no inline width hacks).
// Announced as one text node ("Rated 4.8 out of 5 from 412 reviews").
export function Stars({ rating, reviews }: StarsProps): ReactElement {
  return (
    <p className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}>
      <span aria-hidden="true" className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => {
          if (rating >= i + 1) {
            return <Star key={i} size={14} className="text-sunbeam" fill="currentColor" strokeWidth={0} />;
          }
          if (rating >= i + 0.5) {
            return <StarHalf key={i} size={14} className="text-sunbeam" fill="currentColor" strokeWidth={0} />;
          }
          return <Star key={i} size={14} className="text-stone dark:text-white/20" fill="currentColor" strokeWidth={0} />;
        })}
      </span>
      <span className="text-xs font-semibold text-bark/70 dark:text-gray-300">
        {rating.toFixed(1)} ({reviews})
      </span>
    </p>
  );
}
