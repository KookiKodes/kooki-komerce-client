// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getProductsByFilter } from '../functions/product';

// static
import initialState from '../static/initialCreateProductState';
import initialFilterState from '../static/initialFilterState';

const useGetProductsByFilter = (
  { load = false, delay = 0 } = { load: false, delay: 0 }
) => {
  const [products, setProducts] = useState([initialState]);
  const [filter, setFilter] = useState(initialFilterState);
  const [loading, setLoading] = useState(load);

  const loadProducts = useCallback(
    async args => {
      setLoading(true);
      try {
        const { data: products } = await getProductsByFilter(args);
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

  const resetFilter = useCallback(() => {
    setFilter(initialFilterState);
  }, []);

  const updateFilter = useCallback((name, newValue) => {
    setFilter(filter => ({ ...filter, [name]: newValue }));
  }, []);

  useEffect(() => {
    if (load) {
      loadProducts(filter);
    }
  }, [load, filter, loadProducts]);

  return {
    products,
    loading,
    filter,
    loadProducts,
    updateFilter,
    resetFilter,
  };
};

export default useGetProductsByFilter;
