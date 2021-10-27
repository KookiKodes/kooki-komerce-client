// packages
import {
  Grid,
  GridItem,
  HStack,
  Stack,
  Image,
  Text,
  Tag,
  Drawer,
  DrawerBody,
  IconButton,
  Icon,
  Button,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router';

// components
import Header from './Header';

// hooks
import useCart from '../../lib/hooks/useCart';

// static
import Laptop from '../card/images/laptop.png';

const Layout = () => {
  const [cart, { removeFromCart, cartDrawer }] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  function handleGoToCart() {
    cartDrawer.close();
    if (location.pathname !== '/cart') {
      navigate('/cart', { state: location });
    }
  }

  return (
    <>
      <Drawer
        isOpen={cartDrawer.viewing}
        placement="right"
        onClose={cartDrawer.close}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Cart: {cart.length} {cart.length === 1 ? 'Product' : 'Products'}
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {cart.map(item => {
                return (
                  <Stack key={item?._id} spacing={0}>
                    <Image
                      src={item.images[0]?.url}
                      fallbackSrc={Laptop}
                      alt={item.title}
                      roundedTop="md"
                      maxH={150}
                      objectFit="cover"
                    />
                    <Tag
                      as={HStack}
                      size="lg"
                      roundedTop="none"
                      justify="space-between"
                    >
                      <Text>
                        {item.title} x {item.count}
                      </Text>
                      <IconButton
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => removeFromCart(item)}
                        icon={
                          <Icon as={FontAwesomeIcon} icon={['fal', 'times']} />
                        }
                      />
                    </Tag>
                  </Stack>
                );
              })}
              <Button
                colorScheme="yellow"
                onClick={handleGoToCart}
                rightIcon={
                  <Icon
                    as={FontAwesomeIcon}
                    icon={['fal', 'long-arrow-right']}
                  />
                }
              >
                GO TO CART
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Grid
        overflowX="hidden"
        h="min-content"
        minH="100vh"
        templateColumns="repeat(12, 1fr)"
        templateRows="repeat(2, min-content)"
      >
        <GridItem colSpan={12}>
          <Header />
        </GridItem>
        <GridItem colSpan={12} w="full">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
