import {
  GridItem,
  Spinner,
  Spacer,
  Flex,
  Tag,
  Grid,
  Center,
  Heading,
  Divider,
  Text,
  Stack,
  Image,
  HStack,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { format } from 'currency-formatter';
import delay from 'delay';

// components
import RatingDisplay from '../../components/product/rating';

// hooks
import useWishlist from '../../lib/hooks/useWishlist';
import useCart from '../../lib/hooks/useCart';

const UserWishlist = ({ authtoken, username, location, navigate }) => {
  const { wishlist, remove } = useWishlist({ authtoken, load: true });
  const [cart, { addToCart, exists, userCart, loading }] = useCart({
    authtoken,
    requiresServerState: false,
  });

  const handleRemove = item => {
    remove(item._id);
  };

  const handleView = async item => {
    navigate(`/product/${item.slug}`, { state: location });
  };

  const handlePurchase = async item => {
    if (item.quantity > 0) {
      if (item && !exists.current[item._id]) {
        addToCart({ ...item, count: 1 });
        await userCart.sendToCart(cart);
      }
      await delay(500);
      navigate('/cart', { state: location });
    }
  };

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      templateRows="repeat(12, min-content)"
      w="full"
      gap={10}
    >
      <GridItem colStart={2} colSpan={10} pt={10}>
        <Center>
          <Heading>{username}'s Wishlist</Heading>
        </Center>
      </GridItem>
      {wishlist.map((item, index) => {
        return (
          <GridItem
            as={HStack}
            key={index}
            colSpan={10}
            colStart={2}
            bg="whiteAlpha.100"
            rounded="md"
            align="start"
            spacing={4}
            overflowX="hidden"
            shadow="md"
            role="group"
            _hover={{ shadow: 'xl' }}
          >
            <Flex h="full" w="full" maxW={200}>
              <Image src={item.images[0].url} fit="cover" flex="auto" />
            </Flex>
            <Stack p={2}>
              <HStack spacing={4}>
                <Stack>
                  <Heading>{item.title}</Heading>
                </Stack>
                <Stack>
                  <Tag colorScheme={item.quantity > 0 ? 'blue' : 'red'}>
                    Remaining: {item.quantity}
                  </Tag>
                </Stack>
                <Stack>
                  <Tag colorScheme="green">
                    {format(item.price, { code: 'USD' })}
                  </Tag>
                </Stack>
              </HStack>
              <RatingDisplay
                maxStars={5}
                ratings={item.ratings.map(({ star }) => star)}
              />
              <Divider />
              <Text>{item.description}</Text>
              <Divider />
              <ButtonGroup w="full" as={HStack} justify="end">
                <Button onClick={() => handleRemove(item)}>Remove</Button>
                <Spacer />
                <Button onClick={() => handleView(item)} colorScheme="blue">
                  View Product Page
                </Button>
                <Button
                  onClick={() => handlePurchase(item)}
                  colorScheme="green"
                  disabled={item.quantity < 1}
                >
                  {!loading && 'Purchase Now'}
                  {loading && <Spinner />}
                </Button>
              </ButtonGroup>
            </Stack>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default UserWishlist;
