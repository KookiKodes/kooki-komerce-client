import { useState, useEffect, useCallback } from 'react';
import wait from 'delay';
import pipe from 'pipe-functions';

// functions
import { getUserOrders } from '../functions/user';

const useOrders = ({ authtoken, load = false, delay = 0 }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateOrders = orders => {
    if (orders.length > 0) setOrders(orders);
    return orders;
  };
  const formatResponse = response => response.data;
  const startLoading = data => {
    setLoading(true);
    return data;
  };
  const stopLoading = useCallback(
    async data => {
      setLoading(false);
      await wait(delay);
      return data;
    },
    [delay]
  );
  const loadOrders = useCallback(
    async () =>
      await pipe(
        { authtoken },
        startLoading,
        getUserOrders,
        formatResponse,
        updateOrders,
        stopLoading
      ),
    [authtoken, stopLoading]
  );

  useEffect(() => {
    if (load) {
      loadOrders();
    }
  }, [load, loadOrders]);

  return { orders, loadOrders, loading };
};

export default useOrders;
