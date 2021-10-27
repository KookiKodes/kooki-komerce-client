// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getCategory } from '../functions/category';

//static
import initialState from '../static/intialCategoryState';

const useGetCategory = (
  { load = false, slug, delay = 0 } = { load: false, delay: 0 }
) => {
  const [loading, setLoading] = useState(load);
  const [category, setCategory] = useState(initialState);

  const loadCategory = useCallback(async () => {
    setLoading(true);
    try {
      const { data: category } = await getCategory(slug);
      setCategory(category);
      await wait(delay);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [slug]);

  useEffect(() => {
    if (load) {
      loadCategory();
    }
  }, [loadCategory, load]);

  return { category, loading, loadCategory };
};

export default useGetCategory;
