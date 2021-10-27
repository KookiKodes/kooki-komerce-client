// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getCategoryWithProducts } from '../functions/category';

//static
import initialState from '../static/initialCategoryWithProductsState';

const useGetCategoryWithProducts = (
  { load = false, slug, delay = 0 } = { load: false, delay: 0 }
) => {
  const [loading, setLoading] = useState(load);
  const [state, setState] = useState(initialState);

  const loadCategory = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getCategoryWithProducts(slug);
      setState(data);
      await wait(delay);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [slug, delay]);

  useEffect(() => {
    if (load) {
      loadCategory();
    }
  }, [loadCategory, load]);

  return {
    category: state.category,
    products: state.products,
    loading,
    loadCategory,
  };
};

export default useGetCategoryWithProducts;
