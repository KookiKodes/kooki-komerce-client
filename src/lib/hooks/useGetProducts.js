// packages
import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';

// functions
import { getSortedProducts, getRelatedProducts } from '../functions/product';

const initialState = {
  title: '',
  price: 0,
  quantity: 0,
  description: '',
  images: [{ url: '' }],
  ratings: [],
};

const useGetSortedProducts = ({
  limit,
  sort,
  order,
  delay,
  related = false,
  productId,
  load = false,
}) => {
  const [products, setProducts] = useState([initialState]);
  const [loading, setLoading] = useState(load);

  const loadProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        let products;
        if (related && productId) {
          products = (
            await getRelatedProducts({
              sort,
              order,
              limit,
              page,
              productId,
            })
          ).data;
        } else {
          products = (
            await getSortedProducts({
              sort,
              order,
              limit,
              page,
            })
          ).data;
        }
        setProducts(products);
        await wait(delay);
        setLoading(false);
      } catch (err) {
        console.log(err);
        await wait(delay);
        setLoading(false);
      }
    },
    [limit, order, sort, delay, productId, related]
  );

  useEffect(() => {
    if (load) {
      loadProducts(1);
    }
  }, [loadProducts, load]);

  return { loading, products, loadProducts };
};

export default useGetSortedProducts;
