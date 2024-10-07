import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="flex space-x-1">
      {Array.from({ length: filledStars }, (_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}

      {hasHalfStar && (
        <FaStar key={filledStars} className="text-yellow-500 opacity-50" />
      )}

      {Array.from(
        { length: totalStars - filledStars - (hasHalfStar ? 1 : 0) },
        (_, index) => (
          <FaStar
            key={index + filledStars + (hasHalfStar ? 1 : 0)}
            className="text-gray-300"
          />
        )
      )}
    </div>
  );
}
