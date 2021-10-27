import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_API;

export const getOrders = async ({ authtoken }) =>
  axios.get(`${ENDPOINT}/admin/orders`, { headers: { authtoken } });

export const changeOrderStatus = async ({ orderId, orderStatus, authtoken }) =>
  axios.put(
    `${ENDPOINT}/admin/order/status`,
    { orderId, orderStatus },
    { headers: { authtoken } }
  );
