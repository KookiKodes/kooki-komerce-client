import {
  Text,
  Grid,
  GridItem,
  Heading,
  Center,
  Stack,
  HStack,
  Tag,
  Button,
  Divider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'currency-formatter';
import pipe from 'pipe-functions';
import _ from 'lodash';

// components
import CartTable from '../components/cart/CartTable';
import CartTableHead from '../components/cart/CartTableHead';
import CartRowHeader from '../components/cart/CartRowHeader';
import CartTableBody from '../components/cart/CartTableBody';
import CartRow from '../components/cart/CartRow';

// enums
import Color from '../lib/enums/Color';

// hooks
import useCart from '../lib/hooks/useCart';

// utilities
const mapCart = ({ price, count }) => price * count;
const map = fn => cart => _.map(cart, fn);
const fmat = options => amount => format(amount, options);
const getTotal = cart => pipe(cart, map(mapCart), _.sum, fmat({ code: 'USD' }));

const Cart = () => {
  const user = useSelector(state => state.user);
  const [cart, { removeFromCart, updateCart, userCart }] = useCart({
    authtoken: user.token,
  });
  const colors = Color.getKeys({ original: true });
  const location = useLocation();
  const navigate = useNavigate();
  const styles = useColorModeValue(
    {
      bg: 'gray.50',
      border: 'gray.100',
      color: 'black',
      headColor: 'gray.600',
    },
    {
      bg: 'whiteAlpha.100',
      border: 'whiteAlpha.200',
      color: 'white',
      headColor: 'gray.500',
    }
  );

  async function handleCheckout() {
    if (cart.length) {
      const success = await userCart.sendToCart(cart);
      if (!success) return console.log('cart save error.');
      navigate('/user/checkout', { state: location });
    }
  }

  function handleLogin() {
    navigate('/guest/login', { state: location });
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" pl={6} gap={6} fontSize="xl">
      <GridItem as={Stack} colSpan={8} pt={10}>
        <Heading>
          Cart: {cart.length} {cart.length === 1 ? 'Product' : 'Products'}
        </Heading>
      </GridItem>
      {!cart.length && (
        <GridItem colSpan={8} rowStart={2}>
          <HStack align="center" justify="center" spacing={4} minH={400}>
            <Heading size="lg">No products in cart.</Heading>
            <Button
              onClick={() => navigate('/shop', { state: location })}
              colorScheme="blue"
            >
              Continue shopping?
            </Button>
          </HStack>
        </GridItem>
      )}
      {cart.length > 0 && (
        <GridItem colSpan={8} rowSpan={1} rowStart={2}>
          <CartTable>
            <CartTableHead>
              <CartRowHeader styles={styles}>Image</CartRowHeader>
              <CartRowHeader styles={styles}>Title</CartRowHeader>
              <CartRowHeader styles={styles}>Price</CartRowHeader>
              <CartRowHeader styles={styles}>Brand</CartRowHeader>
              <CartRowHeader styles={styles}>Color</CartRowHeader>
              <CartRowHeader styles={styles}>Count</CartRowHeader>
              <CartRowHeader styles={styles}>Shipping</CartRowHeader>
              <CartRowHeader styles={styles}>Remove</CartRowHeader>
            </CartTableHead>
            <CartTableBody>
              {cart.map((item, index) => {
                return (
                  <CartRow
                    key={index}
                    item={item}
                    styles={styles}
                    colors={colors}
                    onColorChange={({ item, color }) =>
                      updateCart({ ...item, color })
                    }
                    onChangeCount={({ item, count }) =>
                      updateCart({ ...item, count })
                    }
                    onRemove={removeFromCart}
                  />
                );
              })}
            </CartTableBody>
          </CartTable>
        </GridItem>
      )}
      <GridItem
        as={Stack}
        colSpan={4}
        colStart={9}
        rowSpan={2}
        bg={styles.bg}
        px={8}
        pt={10}
      >
        <Center>
          <Heading>Order Summary</Heading>
        </Center>
        <Divider />
        {cart.map((item, index) => {
          const total = format(item.count * item.price, { code: 'USD' });
          return (
            <Stack key={index}>
              <HStack justify="space-between">
                <Text>
                  {item.title} x {item.count}{' '}
                </Text>
                <HStack>
                  <Icon as={FontAwesomeIcon} icon={['fal', 'equals']} />
                  <Tag colorScheme="green" variant="solid">
                    {total}
                  </Tag>
                </HStack>
              </HStack>
            </Stack>
          );
        })}
        <Divider />
        <Heading fontSize="2xl">
          <HStack justify="space-between">
            <Text>Total: </Text>
            <Tag fontSize="2xl" colorScheme="green" variant="solid">
              {getTotal(cart)}
            </Tag>
          </HStack>
        </Heading>
        <Divider />
        {user.role && (
          <Button
            onClick={handleCheckout}
            disabled={!cart.length}
            colorScheme="yellow"
          >
            Proceed to checkout
          </Button>
        )}
        {!user.role && (
          <Button onClick={handleLogin} colorScheme="red">
            Login to checkout
          </Button>
        )}
      </GridItem>
    </Grid>
  );
};

export default Cart;
