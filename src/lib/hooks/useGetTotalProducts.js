// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getTotalProductCount, getTotalRelated } from '../functions/product';

const useGetTotalProducts = (
  { delay = 0, related = false, productId } = { delay: 0 }
) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadTotal = useCallback(async () => {
    setLoading(true);
    try {
      let total;
      if (related && productId) {
        total = (await getTotalRelated({ productId })).data;
      } else total = (await getTotalProductCount()).data;

      setTotalProducts(total);
      await wait(delay);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      await wait(delay);
      setLoading(false);
    }
  }, [delay, productId, related]);

  useEffect(() => {
    loadTotal();
  }, [loadTotal]);

  return { loading, total: totalProducts, getTotal: loadTotal };
};

export default useGetTotalProducts;
