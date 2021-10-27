import {
  Grid,
  GridItem,
  Heading,
  Center,
  Divider,
  Stack,
  HStack,
  List,
  ListItem,
  Icon,
  Tag,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  ButtonGroup,
  SkeletonText,
  Skeleton,
  Badge,
  useColorModeValue,
  useToast,
  CloseButton,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toUpper } from 'lodash';
import { format } from 'currency-formatter';
import { useLocation, useNavigate } from 'react-router-dom';
import delay from 'delay';

// hooks
import useCart from '../../lib/hooks/useCart';
import useAddressForm from '../../components/forms/Address/hooks/useAddressForm';

// helpers
import { toastSuccess, toastError } from '../../lib/helpers/toastHandlers';

// components
import AddressForm from '../../components/forms/Address';

const UserCheckout = ({ authtoken }) => {
  const {
    address,
    setAddress,
    hasAddress,
    loading: loadingAddy,
  } = useAddressForm({
    authtoken,
    load: true,
  });
  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate();
  const [
    ,
    {
      emptyCart,
      userCart: {
        loading,
        cart,
        isEmpty,
        saveAddress,
        applyCoupon,
        calcTotal,
        calcDiscount,
        removeCoupon,
      },
    },
  ] = useCart({ authtoken, load: true, requiresServerState: true });
  const [coupon, setCoupon] = useState('');

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

  useEffect(() => {
    if (cart.appliedCoupon) {
      setCoupon(cart.appliedCoupon.name);
    }
  }, [cart.appliedCoupon]);

  const handleAddCoupon = async () => {
    if (coupon) {
      const response = await applyCoupon(coupon);
      if (response.message) {
        toast(toastError(response.message));
      } else {
        toast(toastSuccess('Coupon applied', 'Coupon successfully applied'));
      }
    }
  };
  const handleRemoveCoupon = () => {
    setCoupon('');
    if (cart.appliedCoupon) {
      removeCoupon();
    }
  };

  const handleAddressSave = async address => {
    if (!isEmpty(address)) {
      saveAddress(address);
    }
  };

  async function handleEmpty() {
    if (!isEmpty(cart)) {
      emptyCart();
      toast(
        toastSuccess('Emptied Cart', 'You have successfully emptied your cart.')
      );
      await delay(500);
      navigate('/shop', { state: location });
    }
  }

  function handlePlaceOrder() {
    if (!isEmpty(cart)) {
      navigate('/user/payment', { state: location });
    }
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" w="full" gap={6} px={6}>
      <GridItem as={Stack} colSpan={7} pt={10}>
        <Center>
          <Heading size="lg">Delivery Address</Heading>
        </Center>
        <AddressForm
          address={address}
          setAddress={setAddress}
          loading={loadingAddy}
          onSubmit={handleAddressSave}
          authtoken={authtoken}
        />
        <Divider />
        <Stack pt={6} spacing={6}>
          <Center>
            <Heading size="lg">Coupons?</Heading>
          </Center>
          <Divider />
          <InputGroup colorScheme="yellow" variant="filled">
            <Input
              id="coupon"
              value={coupon}
              minLength={6}
              maxLength={12}
              disabled={cart.appliedCoupon}
              onChange={({ target: { value } }) => setCoupon(toUpper(value))}
            />
            <InputRightAddon px={coupon ? 0 : 4}>
              {coupon && <CloseButton onClick={handleRemoveCoupon} />}
            </InputRightAddon>
            <InputRightAddon px={0}>
              <Button
                colorScheme="yellow"
                roundedLeft="none"
                onClick={handleAddCoupon}
              >
                Apply Coupon
              </Button>
            </InputRightAddon>
          </InputGroup>
        </Stack>
      </GridItem>
      <GridItem
        colSpan={5}
        as={Stack}
        spacing={6}
        bg={styles.bg}
        px={6}
        py={10}
      >
        <Center>
          <SkeletonText isLoaded={!loading}>
            <Heading>Order Summary</Heading>
          </SkeletonText>
        </Center>
        <Divider />
        <SkeletonText isLoaded={!loading}>
          <Text>Products {cart?.products?.length || 0}</Text>
        </SkeletonText>
        <Divider />
        <Skeleton isLoaded={!loading}>
          {!loading && (
            <List fontSize="xl">
              {cart?.products?.map((item, index) => {
                const total = format(item.product.price * item.count, {
                  code: 'USD',
                });
                return (
                  <ListItem
                    as={HStack}
                    key={index}
                    spacing={6}
                    align="flex-start"
                  >
                    <HStack w="50%" justify="space-between" align="flex-start">
                      <Text>
                        {item.product.title} ({item.color})
                      </Text>
                      <Tag as={HStack} colorScheme="blue" fontSize="lg">
                        <Icon as={FontAwesomeIcon} icon={['fal', 'times']} />
                        <Text>{item.count}</Text>
                      </Tag>
                    </HStack>
                    <HStack w="50%" justify="space-between">
                      <Icon as={FontAwesomeIcon} icon={['fal', 'equals']} />
                      <Tag colorScheme="green" fontSize="xl">
                        {total}
                      </Tag>
                    </HStack>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Skeleton>
        <Divider />
        <SkeletonText isLoaded={!loading}>
          <HStack justify="space-between">
            <Heading>Total: </Heading>
            <Tag
              colorScheme={cart?.totalAfterDiscount ? 'yellow' : 'green'}
              fontSize="3xl"
              textDecoration={
                cart?.totalAfterDiscount ? 'line-through' : 'none'
              }
            >
              {format(cart?.cartTotal, { code: 'USD' })}
            </Tag>
          </HStack>
        </SkeletonText>
        {cart?.totalAfterDiscount && (
          <SkeletonText isLoaded={!loading}>
            <HStack justify="space-between">
              <Badge fontSize="md" colorScheme="blue">
                {cart?.appliedCoupon?.name}
              </Badge>
              <Tag colorScheme="red" fontSize="xl">
                -{format(calcDiscount(), { code: 'USD' })}
              </Tag>
            </HStack>
          </SkeletonText>
        )}
        {cart?.totalAfterDiscount && (
          <SkeletonText isLoaded={!loading}>
            <HStack justify="space-between">
              <Heading>Total After:</Heading>
              <Tag colorScheme="green" fontSize="3xl">
                {format(calcTotal(), { code: 'USD' })}
              </Tag>
            </HStack>
          </SkeletonText>
        )}
        <ButtonGroup>
          <Button
            flex="auto"
            colorScheme="red"
            size="lg"
            disabled={isEmpty()}
            onClick={handleEmpty}
          >
            Empty Cart
          </Button>
          <Button
            flex="auto"
            colorScheme="green"
            size="lg"
            disabled={!hasAddress() || !cart?.products?.length > 0}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </ButtonGroup>
      </GridItem>
    </Grid>
  );
};

export default UserCheckout;
