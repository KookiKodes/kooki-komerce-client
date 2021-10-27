// packages
import { useState, useCallback, useEffect, useRef } from 'react';
import { isEqual } from 'lodash';

const useBooleanValue = (f, t) => {
  const bool = useRef(false);
  const truthy = useRef(t);
  const falsey = useRef(f);
  const [value, setValue] = useState(falsey.current);

  const on = useCallback(() => {
    bool.current = true;
    setValue(truthy.current);
  }, [truthy]);

  const off = useCallback(() => {
    bool.current = false;
    setValue(falsey.current);
  }, [falsey]);

  const toggle = useCallback(() => {
    bool.current = !bool.current;
    if (bool.current) return setValue(truthy.current);
    return setValue(falsey.current);
  }, [falsey, truthy]);

  const is = useCallback(value => {
    return bool.current === value;
  }, []);

  useEffect(() => {
    if (!isEqual(t, truthy.current)) {
      truthy.current = t;
      if (bool.current) setValue(truthy.current);
    }
    if (!isEqual(f, falsey.current)) {
      falsey.current = f;
      if (!bool.current) setValue(falsey.current);
    }
  }, [f, t, off, on]);

  return [value, { on, off, toggle, is }];
};

export default useBooleanValue;
