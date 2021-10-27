// packages
import { Grid, GridItem } from '@chakra-ui/react';

// components
import CreateCouponForm from '../CreateCouponForm';
import CouponTableRow from './CouponTableRow';

const CouponTableRows = ({ children, coupons, ...props }) => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      w="full"
      templateRows="repeat(2, min-content)"
      roundedTop="md"
      transition="all ease .3s"
      borderWidth="2px"
      _hover={{ shadow: 'xl' }}
    >
      <GridItem colSpan={5}>
        <CreateCouponForm
          addCoupon={props.addCoupon}
          authtoken={props.authtoken}
        />
      </GridItem>
      {coupons.map((coupon, index) => {
        return (
          <GridItem colSpan={5} key={index}>
            <CouponTableRow
              coupon={coupon}
              even={index % 2}
              loading={props.loading}
              onDelete={props.onDelete}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default CouponTableRows;
