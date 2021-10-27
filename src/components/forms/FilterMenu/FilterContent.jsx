import { AccordionPanel } from '@chakra-ui/react';
import { useIsVisible } from 'react-is-visible';
import { useRef, useEffect, useCallback, cloneElement } from 'react';

const FilterContent = ({ children, onVisible, styles }) => {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);

  const handleVisible = useCallback(() => {
    if (onVisible) {
      onVisible(ref);
    }
  }, [onVisible]);

  useEffect(() => {
    if (isVisible) {
      handleVisible();
    }
  }, [isVisible, handleVisible]);

  return (
    <AccordionPanel ref={ref}>
      {cloneElement(children, { isVisible })}
    </AccordionPanel>
  );
};

export default FilterContent;
