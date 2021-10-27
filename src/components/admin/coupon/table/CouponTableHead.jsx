import { Grid, Flex, GridItem, Badge } from '@chakra-ui/react';

const CouponTableHead = () => {
  return (
    <GridItem as={Flex} w="full" rowSpan={1} colSpan={5}>
      <Grid w="full" templateColumns="repeat(5, 1fr)">
        <GridItem as={Flex} w="full" colSpan={1}>
          <Badge colorScheme="blue" p={2} pointerEvents="none">
            Name
          </Badge>
        </GridItem>
        <GridItem as={Flex} w="full" colSpan={1}>
          <Badge colorScheme="blue" p={2} pointerEvents="none">
            Expiration
          </Badge>
        </GridItem>
        <GridItem as={Flex} w="full" colSpan={1}>
          <Badge colorScheme="blue" p={2} pointerEvents="none">
            Discount
          </Badge>
        </GridItem>
        <GridItem as={Flex} w="full" colSpan={1}>
          <Badge colorScheme="blue" p={2} pointerEvents="none">
            ID
          </Badge>
        </GridItem>
        <GridItem colSpan={1}>
          <Badge colorScheme="blue" p={2} pointerEvents="none">
            Actions
          </Badge>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default CouponTableHead;
