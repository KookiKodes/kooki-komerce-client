// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getCategories } from '../functions/category';

//static
import initialState from '../static/intialCategoryState';

const useGetCategories = (
  { load = false, delay = 0 } = { load: false, delay: 0 }
) => {
  const [loading, setLoading] = useState(load);
  const [categories, setCategories] = useState([initialState]);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data: categories } = await getCategories();
      setCategories(categories);
      wait(delay);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [delay]);

  useEffect(() => {
    if (load) {
      loadCategories();
    }
  }, [loadCategories, load]);

  return { categories, loading, loadCategories };
};

export default useGetCategories;
