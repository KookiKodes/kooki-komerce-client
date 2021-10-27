import { Grid } from '@chakra-ui/react';
import { useIsVisible } from 'react-is-visible';
import { useRef, useEffect } from 'react';

// components
import SubCategoryRow from './SubCategoryRow';

const SubCategoryRows = ({ loadCategories, ...props }) => {
  const ref = useRef(null);
  const once = useRef(false);
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible && !once.current) {
      loadCategories();
      once.current = true;
    }
  }, [isVisible, once, loadCategories]);

  return (
    <Grid ref={ref} templateColumns="repeat(4, 1fr)">
      {props.filteredCategories.map((category, index) => {
        return (
          <SubCategoryRow
            category={category}
            key={index}
            even={index % 2 === 0}
            {...props}
          />
        );
      })}
    </Grid>
  );
};

export default SubCategoryRows;
