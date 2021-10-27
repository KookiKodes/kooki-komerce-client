import { useState, useEffect, useCallback } from 'react';
import pipe from 'pipe-functions';
import _ from 'lodash';
import wait from 'delay';

// functions
import {
  getUserWishlist,
  addToUserWishlist,
  removeFromUserWishlist,
  getIsWishlisted,
} from '../functions/user';

const useWishlist = ({
  authtoken,
  load = false,
  delay = 0,
  needsState = true,
}) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(load);
  const [wishlisted, setWishlisted] = useState(null);

  const startLoading = data => {
    setLoading(true);
    return data;
  };

  const stopLoading = useCallback(
    async data => {
      await wait(delay);
      setLoading(false);
      return data;
    },
    [delay]
  );

  const updateWishlist = data => {
    if (data && data.length > 0) setWishlist(data);
    return data;
  };

  // expects boolean value
  const updateWishlisted = data => {
    setWishlisted(data);
    return data;
  };

  const wishlistedTrue = data => {
    setWishlisted(true);
    return data;
  };

  const wishlistedFalse = data => {
    setWishlisted(false);
    return data;
  };

  const formatResponse = response => response.data;

  const getWishlist = useCallback(async () => {
    if (needsState) {
      return await pipe(
        { authtoken },
        startLoading,
        getUserWishlist,
        formatResponse,
        updateWishlist,
        stopLoading
      );
    }
    return await pipe(
      { authtoken },
      startLoading,
      getUserWishlist,
      formatResponse,
      stopLoading
    );
  }, [needsState, authtoken, stopLoading]);

  const add = useCallback(
    async productId => {
      if (needsState) {
        return await pipe(
          { authtoken, productId },
          startLoading,
          addToUserWishlist,
          formatResponse,
          updateWishlist,
          wishlistedTrue,
          stopLoading
        );
      }
      return await pipe(
        { authtoken, productId },
        startLoading,
        addToUserWishlist,
        formatResponse,
        wishlistedTrue,
        stopLoading
      );
    },
    [needsState, authtoken, stopLoading]
  );

  const remove = useCallback(
    async productId => {
      if (needsState) {
        return await pipe(
          { authtoken, productId },
          startLoading,
          removeFromUserWishlist,
          formatResponse,
          updateWishlist,
          wishlistedFalse,
          stopLoading
        );
      }
      return await pipe(
        { authtoken, productId },
        startLoading,
        removeFromUserWishlist,
        formatResponse,
        wishlistedFalse,
        stopLoading
      );
    },
    [authtoken, needsState, stopLoading]
  );

  const findFn = data => item => data._id === item._id;
  const find = fn => data => collection => _.find(collection, fn(data));
  const returnBoolean = data => (_.isEmpty(data) ? false : true);

  const isWishlisted = useCallback(
    async productId => {
      if (needsState) {
        return await pipe(productId, find(findFn)(productId), returnBoolean);
      }
      return await pipe(
        { authtoken, productId },
        startLoading,
        getIsWishlisted,
        formatResponse,
        updateWishlisted,
        stopLoading
      );
    },
    [needsState, authtoken, stopLoading]
  );

  useEffect(() => {
    if (load) {
      getWishlist();
    }
  }, [load, getWishlist, isWishlisted]);

  return {
    wishlist,
    loading,
    getWishlist,
    add,
    remove,
    isWishlisted,
    wishlisted,
  };
};

export default useWishlist;
