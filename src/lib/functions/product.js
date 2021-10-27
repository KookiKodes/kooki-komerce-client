import axios from 'axios';

const ENDPOINT = process.env.REACT_APP_API;

export const createProduct = async ({ product, authtoken }) =>
  await axios.post(`${ENDPOINT}/product`, product, {
    headers: { authtoken },
  });

export const getProductsByCount = async count =>
  await axios.get(`${ENDPOINT}/products/${count}`);

export const getProduct = async ({ slug }) =>
  await axios.get(`${ENDPOINT}/product/${slug}`);

export const getPopulatedProduct = async ({ slug }) =>
  await axios.get(`${ENDPOINT}/product/${slug}/populate`);

export const getTotalProductCount = async () =>
  await axios.get(`${ENDPOINT}/products/total`);

export const updateProduct = async ({ slug, product, authtoken }) =>
  await axios.put(`${ENDPOINT}/product/${slug}`, product, {
    headers: { authtoken },
  });

export const getSortedProducts = async ({ sort, limit, order, page }) =>
  await axios.post(`${ENDPOINT}/products`, { sort, limit, order, page });

export const removeProduct = async ({ slug, authtoken }) =>
  await axios.delete(`${ENDPOINT}/product/${slug}`, {
    headers: { authtoken },
  });

export const addReview = async ({ star, productId, authtoken }) =>
  await axios.put(
    `${ENDPOINT}/product/rating/${productId}`,
    { star },
    {
      headers: { authtoken },
    }
  );

export const getRelatedProducts = async ({
  sort,
  limit,
  order,
  page,
  productId,
}) =>
  await axios.get(
    `${ENDPOINT}/product/related/${productId}/${page}/${limit}/${sort}/${order}`
  );

export const getTotalRelated = async ({ productId }) =>
  await axios.get(`${ENDPOINT}/product/related/${productId}/total`);

// search
export const getProductsByFilter = async args =>
  await axios.post(`${ENDPOINT}/search/filters`, args);
