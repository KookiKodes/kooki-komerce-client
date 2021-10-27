import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getSubWithProducts } from '../functions/sub';

//static
import initialState from '../static/initialSubWithProducts';

const useGetCategoryWithProducts = (
  { load = false, slug, delay = 0 } = { load: false, delay: 0 }
) => {
  const [loading, setLoading] = useState(load);
  const [state, setState] = useState(initialState);

  const loadSubCategory = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getSubWithProducts(slug);
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
      loadSubCategory();
    }
  }, [loadSubCategory, load]);

  return {
    sub: state.sub,
    products: state.products,
    loading,
    loadSubCategory,
  };
};

export default useGetCategoryWithProducts;
