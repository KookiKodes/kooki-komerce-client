// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getSubs } from '../functions/sub';

//static
import initialState from '../static/intialSubCategoryState';

const useGetSubCategories = (
  { load = false, delay = 0 } = { load: false, delay: 0 }
) => {
  const [loading, setLoading] = useState(load);
  const [subCategories, setSubCategories] = useState([initialState]);

  const loadSubCategories = useCallback(async () => {
    try {
      setLoading(true);
      const { data: subs } = await getSubs();
      setSubCategories(subs);
      await wait(delay);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [delay]);

  useEffect(() => {
    if (load) {
      loadSubCategories();
    }
  }, [loadSubCategories, load]);

  return { subCategories, loading, loadSubCategories };
};

export default useGetSubCategories;
