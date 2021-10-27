import { useState, useRef, useCallback } from 'react';

export default function usePage({
  min = 0,
  max = 1,
  step = 1,
  defaultValue = 0,
}) {
  const pageInfo = useRef({ min, max, step, defaultValue });
  const [curPage, setCurPage] = useState(defaultValue);

  const increment = useCallback(() => {
    const { max } = pageInfo.current;
    if (curPage + 1 <= max) {
      setCurPage(page => page + step);
    }
  }, [curPage, step]);

  const decrement = useCallback(() => {
    const { min } = pageInfo.current;
    if (curPage - 1 >= min) {
      setCurPage(page => page - step);
    }
  }, [curPage, step]);

  const select = useCallback(num => {
    const { min, max } = pageInfo.current;
    if (num >= min && num <= max) {
      setCurPage(num);
    }
  }, []);

  const update = useCallback(
    options => {
      pageInfo.current = { ...pageInfo.current, ...options };
      const { min, max } = pageInfo.current;
      if (curPage > max) setCurPage(max);
      if (curPage < min) setCurPage(min);
    },
    [curPage]
  );

  return [curPage, { increment, decrement, select, update }];
}
