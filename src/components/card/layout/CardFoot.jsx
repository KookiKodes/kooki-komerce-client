import { Grid } from '@chakra-ui/react';

const CardFoot = ({ children }) => {
  return (
    <Grid w="full" templateColumns="repeat(4, 1fr)">
      {children}
    </Grid>
  );
};

export default CardFoot;
