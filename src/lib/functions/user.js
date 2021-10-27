import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_API;

export const userCart = async ({ cart, authtoken }) =>
  await axios.post(
    `${ENDPOINT}/user/cart`,
    { cart },
    { headers: { authtoken } }
  );

export const getUserCart = async ({ authtoken }) =>
  await axios.get(`${ENDPOINT}/user/cart`, { headers: { authtoken } });

export const emptyUserCart = async ({ authtoken }) =>
  await axios.delete(`${ENDPOINT}/user/cart`, { headers: { authtoken } });

export const saveUserAddress = async ({ address, authtoken }) =>
  await axios.post(
    `${ENDPOINT}/user/address`,
    { address },
    { headers: { authtoken } }
  );

export const getUserAddress = async ({ authtoken }) =>
  await axios.get(`${ENDPOINT}/user/address`, { headers: { authtoken } });

export const applyCouponToCart = async ({ authtoken, coupon }) =>
  await axios.post(
    `${ENDPOINT}/user/coupon/apply`,
    { coupon },
    { headers: { authtoken } }
  );

export const removeCouponFromCart = async ({ authtoken }) =>
  await axios.delete(`${ENDPOINT}/user/coupon/remove`, {
    headers: { authtoken },
  });

export const createOrder = async ({ authtoken, stripeResponse }) =>
  await axios.post(
    `${ENDPOINT}/user/order`,
    { stripeResponse },
    { headers: { authtoken } }
  );

export const getUserOrders = async ({ authtoken }) =>
  await axios.get(`${ENDPOINT}/user/orders`, { headers: { authtoken } });

export const getUserWishlist = async ({ authtoken }) =>
  await axios.get(`${ENDPOINT}/user/wishlist`, { headers: { authtoken } });

export const getIsWishlisted = async ({ authtoken, productId }) =>
  await axios.get(`${ENDPOINT}/user/wishlist/${productId}`, {
    headers: { authtoken },
  });

export const addToUserWishlist = async ({ authtoken, productId }) =>
  await axios.post(
    `${ENDPOINT}/user/wishlist`,
    { productId },
    { headers: { authtoken } }
  );

export const removeFromUserWishlist = async ({ authtoken, productId }) =>
  await axios.delete(`${ENDPOINT}/user/wishlist/${productId}`, {
    headers: { authtoken },
  });
