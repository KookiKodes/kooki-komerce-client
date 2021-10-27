// packages
import { Accordion, Grid } from '@chakra-ui/react';

const CategoryTable = ({ children }) => {
  return (
    <Accordion w="full" allowToggle>
      <Grid
        templateRows="repeat(3, min-content)"
        templateColumns="repeat(4, 1fr)"
      >
        {children}
      </Grid>
    </Accordion>
  );
};

export default CategoryTable;
