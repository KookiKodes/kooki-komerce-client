import {
  Grid,
  Tag,
  GridItem,
  Heading,
  Center,
  Stack,
  HStack,
  Divider,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'currency-formatter';
import '../../styles/stripe.css';

// hooks
import useCart from '../../lib/hooks/useCart';

// components
import StripeCheckout from '../../components/StripeCheckout';

// load stripe outside of components render to avoid recreating stripe object on every render.

const stripe = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const UserPayment = ({ authtoken }) => {
  const [
    ,
    {
      emptyCart,
      userCart: { cart },
    },
  ] = useCart({
    authtoken,
    requiresServerState: true,
    load: true,
    keepUpdatedWithLocal: false,
  });

  const styles = useColorModeValue(
    { bg: 'gray.100', border: 'gray.200' },
    { bg: 'whiteAlpha.100', border: 'whiteAlpha.200' }
  );

  function handleSubmit() {
    console.log('test');
    emptyCart();
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={10}>
      <GridItem colStart={3} colSpan={8} pt={10}>
        <Center>
          <Heading>Complete your purchase</Heading>
        </Center>
      </GridItem>
      <GridItem colStart={3} as={Stack} colSpan={8} spacing={6}>
        <Stack align="center" spacing={0} fontSize="lg">
          <Text>For testing purposes, you can enter the </Text>
          <Text>Credit Card Number as 4242 4242 4242 4242</Text>
        </Stack>
        <Stack w="full" align="center">
          {!cart?.appliedCoupon && (
            <Tag as={Center} colorScheme="red" w="full" fontSize="xl" p={5}>
              No coupon applied
            </Tag>
          )}
          {cart?.appliedCoupon && (
            <Tag
              as={Center}
              colorScheme="blue"
              // variant="solid"
              w="full"
              fontSize="2xl"
              p={5}
            >
              "{cart?.appliedCoupon.name}" coupon applied
            </Tag>
          )}
        </Stack>
        <Divider />
        <HStack bg={styles.bg} fontSize="xl" spacing={0}>
          <Stack w="full" align="center" p={6} borderWidth="2px">
            <Icon
              as={FontAwesomeIcon}
              color="green.500"
              icon={['fal', 'usd-circle']}
            />
            <Text>Total: {format(cart?.cartTotal, { code: 'USD' })}</Text>
          </Stack>
          <Stack w="full" align="center" p={6} borderWidth="2px">
            <Icon
              as={FontAwesomeIcon}
              color="green.500"
              icon={['fal', 'check']}
            />
            {!cart.appliedCoupon && (
              <Text>
                Total Payable: {format(cart?.cartTotal, { code: 'USD' })}
              </Text>
            )}
            {cart.appliedCoupon && (
              <Text>
                Total Payable:{' '}
                {format(cart?.totalAfterDiscount, { code: 'USD' })}
              </Text>
            )}
          </Stack>
        </HStack>
      </GridItem>
      <GridItem colStart={3} colSpan={8}>
        <Elements stripe={stripe}>
          <StripeCheckout onSubmit={handleSubmit} />
        </Elements>
      </GridItem>
    </Grid>
  );
};

export default UserPayment;
