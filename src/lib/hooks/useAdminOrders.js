import { useState, useEffect, useCallback } from 'react';
import pipe from 'pipe-functions';
import _ from 'lodash';

// functions
import { getOrders, changeOrderStatus } from '../functions/admin';

const useAdminOrders = ({ authtoken, load = false } = { load: false }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(load);

  const startLoading = data => {
    setLoading(true);
    return data;
  };

  const stopLoading = data => {
    setLoading(false);
    return data;
  };

  const updateOrders = data => {
    if (data && data.length > 0) setOrders(data);
    return data;
  };

  const formatResponse = response => response.data;

  const loadOrders = useCallback(
    async () =>
      pipe(
        { authtoken },
        startLoading,
        getOrders,
        formatResponse,
        updateOrders,
        stopLoading
      ),
    [authtoken]
  );

  const map = fn => collection => data => _.map(collection, fn(data));

  const findAndUpdate = data => order => order._id === data._id ? data : order;

  const updateStatus = useCallback(
    async (orderId, orderStatus) =>
      await pipe(
        { authtoken, orderId, orderStatus },
        startLoading,
        changeOrderStatus,
        formatResponse,
        map(findAndUpdate)(orders),
        updateOrders,
        stopLoading
      ),
    [authtoken, orders]
  );

  useEffect(() => {
    if (load) {
      loadOrders();
    }
  }, [load, loadOrders]);

  return { orders, loading, loadOrders, updateStatus };
};

export default useAdminOrders;
