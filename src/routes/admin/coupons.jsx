import { Grid, GridItem, Heading, Divider, Center } from '@chakra-ui/react';

// hooks
import useCoupon from '../../lib/hooks/useCoupon';

//components
import CouponTable from '../../components/admin/coupon/table';
import CouponTableHead from '../../components/admin/coupon/table/CouponTableHead';
import CouponTableRows from '../../components/admin/coupon/table/CouponTableRows';

const ManageCoupons = ({ authtoken }) => {
  const { coupons, loading, addCoupon, remove } = useCoupon({
    authtoken,
    load: true,
  });

  function handleDelete({ context }) {
    if (context) {
      remove(context);
    }
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={10}>
      <GridItem colSpan={12} pt={10}>
        <Center>
          <Heading>Coupons</Heading>
        </Center>
        <Divider />
      </GridItem>
      <GridItem colSpan={12}>
        <CouponTable>
          <CouponTableHead />
          <GridItem rowSpan={1} colSpan={5} my={4}>
            <CouponTableRows
              coupons={coupons}
              addCoupon={addCoupon}
              authtoken={authtoken}
              loading={loading}
              onDelete={handleDelete}
            />
          </GridItem>
        </CouponTable>
      </GridItem>
    </Grid>
  );
};

export default ManageCoupons;
