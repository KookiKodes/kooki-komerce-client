import axios from 'axios';

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getParentSubs = async ({ parentId }) =>
  await axios.get(`${process.env.REACT_APP_API}/subs/parent/${parentId}`);

export const getSub = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const getSubWithProducts = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}/products`);

export const removeSub = async ({ slug, authtoken }) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: { authtoken },
  });

export const updateSub = async ({ slug, category, authtoken }) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, category, {
    headers: { authtoken },
  });

export const createSub = async ({ category, authtoken }) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, category, {
    headers: { authtoken },
  });
