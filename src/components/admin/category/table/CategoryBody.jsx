//packages
import { GridItem } from '@chakra-ui/react';

const CategoryBody = ({ children }) => {
  return (
    <GridItem rowSpan={1} colSpan={4} my={4}>
      {children}
    </GridItem>
  );
};

export default CategoryBody;
