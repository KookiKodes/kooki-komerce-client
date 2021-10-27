// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getProductsByCount } from '../functions/product';

// static
import initialState from '../static/initialCreateProductState';

const useGetProductsByCount = (
  { count, load = false, delay = 0 } = { count: 3, load: false, delay: 0 }
) => {
  const [products, setProducts] = useState([initialState]);
  const [loading, setLoading] = useState(load);

  const loadProducts = useCallback(
    async count => {
      setLoading(true);
      try {
        const { data: products } = await getProductsByCount(count);
        setProducts(products);
        await wait(delay);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    },
    [delay]
  );

  useEffect(() => {
    if (load) {
      loadProducts(count);
    }
  }, [load, count, loadProducts]);

  const on = useCallback(async () => {
    setLoading(true);
  }, []);

  const off = useCallback(async () => {
    await wait(delay);
    setLoading(false);
  }, [delay]);

  return {
    products,
    loading,
    loadProducts,
    updateProducts: setProducts,
    setLoading: { on, off },
  };
};

export default useGetProductsByCount;
