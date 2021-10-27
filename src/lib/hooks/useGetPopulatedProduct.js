// packages
import { useToast } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getPopulatedProduct } from '../functions/product';

// helpers
import { toastError } from '../helpers/toastHandlers';

//static
import initialState from '../static/initialCreateProductState';

export default function useGetPopulatedProduct({ slug, delay }) {
  const [product, updateProduct] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadProduct = useCallback(
    async (slug, shouldReload = true) => {
      if (shouldReload) setLoading(true);
      try {
        const { data: product } = await getPopulatedProduct({ slug });
        updateProduct(product);
        if (delay) await wait(delay);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast(toastError(err.message));
      }
    },
    [delay, toast]
  );

  useEffect(() => {
    loadProduct(slug);
  }, [loadProduct, slug]);

  return { product, loading, updateProduct, loadProduct };
}
