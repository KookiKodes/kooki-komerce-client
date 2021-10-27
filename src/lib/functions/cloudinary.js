import axios from 'axios';

export const uploadImage = ({ image, authtoken }) =>
  axios.post(
    `${process.env.REACT_APP_API}/upload-image`,
    { image },
    { headers: { authtoken } }
  );

export const removeImage = ({ public_id, authtoken }) =>
  axios.post(
    `${process.env.REACT_APP_API}/remove-image`,
    { public_id },
    { headers: { authtoken } }
  );
