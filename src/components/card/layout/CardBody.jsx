import { Grid } from '@chakra-ui/react';

const CardBody = ({ children, ...props }) => {
  return (
    <Grid w="full" gap={2} templateColumns="repeat(4,1fr)" p={2} {...props}>
      {children}
    </Grid>
  );
};

export default CardBody;
