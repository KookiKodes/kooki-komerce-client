// packages
import pipe from 'pipe-functions';
import { useCallback, useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import wait from 'delay';

// actions
import ActionTypes from '../enums/ActionTypes';

// functions
import {
  userCart,
  getUserCart as getCart,
  emptyUserCart,
  saveUserAddress,
  applyCouponToCart,
  removeCouponFromCart,
} from '../functions/user';

// utility
const convertCart = cart =>
  _.reduce(cart, (exists, { _id }) => ({ ...exists, [_id]: true }), {});
const divide = by => num => _.divide(num, by);
const multiply = by => num => _.multiply(num, by);
const subtract = num => by => _.subtract(num, by);
const round = percision => num => _.round(num, percision);

const useCart = (
  {
    authtoken,
    load = false,
    delay = 0,
    requiresServerState = false,
    keepUpdatedWithLocal = true,
  } = {
    load: false,
    delay: 0,
    requiresServerState: false,
    keepUpdatedWithLocal: true,
  }
) => {
  const {
    cart,
    page: { cartDrawer },
  } = useSelector(state => state);
  const [serverCart, setServerCart] = useState({});
  const [loading, setLoading] = useState(load);
  const exists = useRef(convertCart(cart));
  const dispatch = useDispatch();

  const action = type => ActionTypes[type];
  const format = item => type => ({ type, payload: item });
  const resetServerCart = () => setServerCart({});

  const addToExists = item => type => {
    exists.current[item?._id] = true;
    return type;
  };
  const removeFromExists = item => type => {
    exists.current[item?._id] = false;
    return type;
  };

  const update = useCallback(
    (type, item) => pipe(type, action, format(item), dispatch),
    [dispatch]
  );
  const addToCart = useCallback(
    item =>
      pipe('add_to_cart', action, addToExists(item), format(item), dispatch),
    [dispatch]
  );
  const removeFromCart = useCallback(
    item =>
      pipe(
        'remove_from_cart',
        action,
        removeFromExists(item),
        format(item),
        dispatch
      ),
    [dispatch]
  );
  const updateCart = useCallback(
    item => pipe('update_cart', action, format(item), dispatch),
    [dispatch]
  );

  const openCartDrawer = useCallback(
    () => pipe('cart_drawer_on', action, format({}), dispatch),
    [dispatch]
  );

  const closeCartDrawer = useCallback(
    () => pipe('cart_drawer_off', action, format({}), dispatch),
    [dispatch]
  );

  const toggleCartDrawer = useCallback(
    () => pipe('cart_drawer_toggle', action, format({}), dispatch),
    [dispatch]
  );

  const emptyLocalCart = useCallback(
    () => pipe('empty_cart', action, format({}), dispatch),
    [dispatch]
  );
  const emptyServerCart = useCallback(
    async token => pipe(token, emptyUserCart, resetServerCart),
    []
  );

  const returnSuccess = async ({ data: { success } }) =>
    success ? true : false;
  const handleCartResponse = response => {
    setServerCart(response.data.cart);
    return response;
  };

  const sendToUserCart = async cart =>
    pipe({ authtoken, cart }, userCart, handleCartResponse, returnSuccess);

  const handleUserCart = useCallback(
    async response => {
      setServerCart(response.data);
      await wait(delay);
      setLoading(false);
      return response.data;
    },
    [delay]
  );

  const getUserCart = useCallback(async () => {
    setLoading(true);
    return pipe({ authtoken }, getCart, handleUserCart);
  }, [authtoken, handleUserCart]);

  const emptyBoth = useCallback(
    async () => pipe({ authtoken }, emptyServerCart, emptyLocalCart),
    [authtoken, emptyLocalCart, emptyServerCart]
  );

  const isEmpty = useCallback(
    () => !Reflect.has(serverCart, 'products'),
    [serverCart]
  );

  const saveAddress = useCallback(
    async address =>
      pipe({ address, authtoken }, saveUserAddress, returnSuccess),
    [authtoken]
  );

  const updateAfterCoupon = data => {
    if (data.totalAfterDiscount)
      setServerCart(cart => ({
        ...cart,
        totalAfterDiscount: data.totalAfterDiscount,
        appliedCoupon: data.appliedCoupon,
      }));
    return data;
  };

  const formatDiscountResponse = response => response.data;

  const handleError = data =>
    data.message ? { message: data.message, totalAfterDiscount: null } : data;

  const applyCoupon = useCallback(
    async coupon =>
      await pipe(
        { authtoken, coupon },
        applyCouponToCart,
        formatDiscountResponse,
        handleError,
        updateAfterCoupon
      ),
    [authtoken]
  );

  const clearCoupon = response => {
    setServerCart(cart => ({
      ...cart,
      appliedCoupon: null,
      totalAfterDiscount: null,
    }));
    return response.data;
  };

  const removeCoupon = useCallback(
    async () =>
      await pipe({ authtoken }, removeCouponFromCart, handleError, clearCoupon),
    [authtoken]
  );

  const calcTotal = useCallback(
    () =>
      pipe(
        serverCart?.cartTotal,
        multiply(serverCart?.appliedCoupon?.discount),
        divide(100),
        subtract(serverCart?.cartTotal),
        round(2)
      ),
    [serverCart?.cartTotal, serverCart?.appliedCoupon?.discount]
  );

  const calcDiscount = useCallback(
    () =>
      pipe(
        serverCart?.cartTotal,
        multiply(serverCart?.appliedCoupon?.discount),
        divide(100),
        round(2)
      ),
    [serverCart?.cartTotal, serverCart?.appliedCoupon?.discount]
  );

  useEffect(() => {
    if (load && requiresServerState) {
      getUserCart();
    }
  }, [load, getUserCart, requiresServerState]);

  useEffect(() => {
    if (authtoken && keepUpdatedWithLocal && requiresServerState) {
      userCart({ authtoken, cart });
    }
  }, [cart, authtoken, keepUpdatedWithLocal, requiresServerState]);

  useEffect(() => {
    exists.current = convertCart(cart);
    if (!cart.length) closeCartDrawer();
  }, [cart, closeCartDrawer]);

  return [
    cart,
    {
      exists,
      update,
      updateCart,
      addToCart,
      removeFromCart,
      emptyCart: authtoken ? emptyBoth : emptyLocalCart,
      cartDrawer: {
        viewing: cartDrawer,
        open: openCartDrawer,
        close: closeCartDrawer,
        toggle: toggleCartDrawer,
      },
      userCart: authtoken
        ? {
            loading,
            cart: serverCart,
            sendToCart: sendToUserCart,
            getCart: getUserCart,
            applyCoupon,
            saveAddress,
            update,
            isEmpty,
            calcTotal,
            calcDiscount,
            removeCoupon,
          }
        : null,
    },
  ];
};

export default useCart;
