import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_API;

export const getCoupons = async () => await axios.get(`${ENDPOINT}/coupons`);

export const removeCoupon = async ({ id, authtoken }) =>
  await axios.delete(`${ENDPOINT}/coupon/${id}`, { headers: { authtoken } });

export const createCoupon = async ({ authtoken, coupon }) =>
  await axios.post(`${ENDPOINT}/coupon`, coupon, { headers: { authtoken } });
