import { useState, useEffect, useCallback, useRef } from 'react';
import wait from 'delay';
import pipe from 'pipe-functions';
import _ from 'lodash';

// utils
import initialState from '../utils/initialState';
import { getUserAddress } from '../../../../lib/functions/user';

const useAddressForm = (
  { authtoken, delay = 0, load = false } = { delay: 0, load: false }
) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(load);
  const userHasAddress = useRef(false);

  const returnSuccess = ({ success }) => (success ? true : false);
  const formatResponse = ({ data: { success, address } }) => ({
    success,
    address,
  });
  const updateState = data => {
    if (data.success) setState(data.address);
    return data;
  };
  const updateUserHasAddress = data => {
    if (data.success) userHasAddress.current = true;
    return data;
  };
  const on = useCallback(token => {
    setLoading(true);
    return token;
  }, []);
  const off = useCallback(token => {
    setLoading(false);
    return token;
  }, []);
  const stopLoading = useCallback(
    async success => {
      await wait(delay);
      off(authtoken);
      return success;
    },
    [delay, off, authtoken]
  );

  const getAddress = useCallback(
    () =>
      pipe(
        { authtoken },
        on,
        getUserAddress,
        formatResponse,
        updateState,
        updateUserHasAddress,
        returnSuccess,
        stopLoading
      ),
    [authtoken, on, stopLoading]
  );

  const hasAddress = () => userHasAddress.current;

  const cityIsValid = ({ state, result }) => ({
    state,
    result: result && (_.isString(state.city) || _.isEmpty(state.state)),
  });

  const stateIsValid = ({ state, result }) => ({
    state,
    result:
      result &&
      ((_.isString(state.state) && state.state.length === 2) ||
        _.isEmpty(state.state)),
  });

  const zipCodeIsValid = ({ state, result }) => ({
    state,
    result: result && _.isNumber(state.zipCode),
  });

  const otherIsValid = ({ state, result }) => ({
    state,
    result: result && (_.isString(state.other) || _.isEmpty(state.other)),
  });

  const streetIsValid = ({ state, result }) => ({
    state,
    result: result && _.isString(state.street),
  });

  const nameIsValid = ({ state, result }) => ({
    state,
    result: result && _.isString(state.fullName),
  });

  const countryIsValid = ({ state, result }) => ({
    state,
    result: result && state.country.length === 2 && _.isString(state.country),
  });

  const checkAddressFields = useCallback(
    () =>
      pipe(
        { state, result: true },
        countryIsValid,
        nameIsValid,
        streetIsValid,
        otherIsValid,
        zipCodeIsValid,
        stateIsValid,
        cityIsValid
      ),
    [state]
  );

  useEffect(() => {
    const { result } = checkAddressFields();
    if (result) {
      return (userHasAddress.current = true);
    }
    return (userHasAddress.current = false);
  }, [state, checkAddressFields]);

  useEffect(() => {
    if (load) {
      getAddress();
    }
  }, [load, getAddress]);

  return {
    address: state,
    loading,
    getAddress,
    setAddress: setState,
    hasAddress,
  };
};

export default useAddressForm;
