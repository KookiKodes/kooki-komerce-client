import { Grid } from '@chakra-ui/react';

const CouponTable = ({ children }) => {
  return (
    <Grid
      templateRows="repeat(3, min-content)"
      templateColumns="repeat(5, 1fr)"
    >
      {children}
    </Grid>
  );
};

export default CouponTable;
