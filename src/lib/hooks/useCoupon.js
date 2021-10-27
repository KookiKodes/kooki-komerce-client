//packages
import { useState, useCallback, useEffect } from 'react';
import wait from 'delay';
import pipe from 'pipe-functions';
import _ from 'lodash';

// functions
import { createCoupon, getCoupons, removeCoupon } from '../functions/coupon';

const useCoupon = (
  { authtoken, load = false, delay = 0, needState = true } = {
    load: false,
    delay: 0,
    needState: true,
  }
) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(load);

  const addCoupon = useCallback(
    coupon => pipe([...coupons, coupon], setCoupons),
    [coupons]
  );

  const removeFrom = coupons => coupon =>
    _.filter(coupons, c => c._id !== coupon._id);

  const deleteCoupon = useCallback(
    coupon => pipe(coupon, removeFrom(coupons), setCoupons),
    [coupons]
  );

  const returnCoupon = ({ coupon }) => coupon;
  const formatResponse = response => response.data;
  const addCouponFromResponse = data => {
    if (data.coupon) setCoupons(c => [...c, data.coupon]);
    return data;
  };
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

  const create = useCallback(
    async coupon => {
      if (needState) {
        return await pipe(
          { authtoken, coupon },
          startLoading,
          createCoupon,
          formatResponse,
          addCouponFromResponse,
          stopLoading,
          returnCoupon
        );
      }
      return await pipe(
        { authtoken, coupon },
        startLoading,
        createCoupon,
        formatResponse,
        stopLoading,
        returnCoupon
      );
    },
    [stopLoading, authtoken, needState]
  );

  const get = useCallback(async () => {
    if (needState) {
      return await pipe(
        {},
        startLoading,
        getCoupons,
        formatResponse,
        setCoupons,
        stopLoading
      );
    }
    return await pipe(
      {},
      startLoading,
      getCoupons,
      formatResponse,
      stopLoading
    );
  }, [needState, stopLoading]);

  const remove = useCallback(
    async coupon => {
      if (needState) {
        return await pipe(
          { authtoken, id: coupon._id },
          startLoading,
          removeCoupon,
          formatResponse,
          deleteCoupon,
          stopLoading
        );
      }
      return await pipe(
        { authtoken, id: coupon._id },
        startLoading,
        removeCoupon,
        formatResponse,
        stopLoading
      );
    },
    [needState, stopLoading, authtoken, deleteCoupon]
  );

  useEffect(() => {
    if (load) {
      get();
    }
  }, [load, get]);

  return { coupons, create, get, remove, loading, addCoupon };
};

export default useCoupon;
