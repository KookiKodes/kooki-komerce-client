// packages
import { useState, useCallback, useEffect } from 'react';
import { round, sum } from 'lodash';

const useRating = ({ ratings, maxStars, selected = 0 }) => {
  const [rating, setRating] = useState({
    index: selected,
    ratings,
    selected,
    average: 0,
  });

  const updateIndex = useCallback(
    newIndex => {
      if (newIndex < maxStars) {
        setRating(rating => ({
          ...rating,
          index: newIndex,
        }));
      }
    },
    [maxStars]
  );

  const calcAverageRating = useCallback(() => {
    if (ratings?.length) {
      const average = round(sum(rating.ratings) / ratings?.length, 1);
      setRating(rating => ({
        ...rating,
        average,
      }));
    }
  }, [ratings?.length, rating.ratings]);

  const setSelected = useCallback(
    async value => {
      if (value !== rating.selected) {
        setRating(rating => ({
          ...rating,
          selected: value,
          index: value,
        }));
      }
    },
    [rating.selected]
  );

  useEffect(() => {
    if (ratings?.length) {
      setRating(rating => {
        return {
          ...rating,
          ratings,
        };
      });
    }
  }, [ratings]);

  useEffect(() => {
    calcAverageRating();
  }, [calcAverageRating, rating.ratings]);

  return { rating, updateIndex, setSelected };
};

export default useRating;
