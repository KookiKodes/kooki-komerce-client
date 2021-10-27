// packages
import {
  Grid,
  GridItem,
  Flex,
  HStack,
  SkeletonText,
  Text,
  ButtonGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';

// components
import DeleteAction from '../../actions/DeleteAction';

const CouponTableRow = ({ loading, coupon, onDelete, even }) => {
  const styles = useColorModeValue(
    { bg: even ? 'gray.50' : 'gray.100' },
    {
      bg: even ? 'whiteAlpha.100' : 'whiteAlpha.300',
    }
  );

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      gap={6}
      p={4}
      overflowX="auto"
      bg={styles.bg}
    >
      <GridItem as={Flex} alignItems="center" colSpan={1}>
        <SkeletonText isLoaded={!loading} noOfLines={2}>
          <Text>{coupon?.name}</Text>
        </SkeletonText>
      </GridItem>
      <GridItem colSpan={1} as={Flex} alignItems="center">
        <SkeletonText isLoaded={!loading} noOfLines={2}>
          <Text>{DateTime.fromISO(coupon?.expiration).toFormat('ff')}</Text>
        </SkeletonText>
      </GridItem>
      <GridItem colSpan={1} as={Flex} alignItems="center">
        <SkeletonText isLoaded={!loading} noOfLines={2}>
          <Text isTruncated>{coupon?.discount}%</Text>
        </SkeletonText>
      </GridItem>
      <GridItem colSpan={1} as={HStack} overflow="hidden">
        <SkeletonText isLoaded={!loading} noOfLines={2}>
          <Text isTruncated>{coupon?._id}</Text>
        </SkeletonText>
      </GridItem>
      <GridItem as={ButtonGroup} colSpan={1}>
        <DeleteAction
          context={coupon}
          name={coupon?.name}
          isDisabled={loading}
          onDelete={onDelete}
        >
          Are you sure you want to delete {coupon.name} coupon permanently?
        </DeleteAction>
      </GridItem>
    </Grid>
  );
};

export default CouponTableRow;
