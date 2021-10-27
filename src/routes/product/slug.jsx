// packages
import {
  Grid,
  GridItem,
  Divider,
  Spinner,
  Center,
  Text,
  Link as CLink,
  Tag,
  Icon,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'currency-formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// hooks
import useGetPopulatedProduct from '../../lib/hooks/useGetPopulatedProduct';
import useGetTotalProducts from '../../lib/hooks/useGetTotalProducts';
import useCart from '../../lib/hooks/useCart';

// components
import Carousel from '../../components/product/carousel';
import InfoList from '../../components/product/info-list';
import InfoListItem from '../../components/product/info-list/InfoListItem';
import DescriptionTab from '../../components/product/DescriptionTab';
import ProductDisplay from '../../components/ProductDisplay';
import RatingDisplay from '../../components/product/rating';
import ProductActions from '../../components/product/actions/ProductViewActions';

// enums
import Color from '../../lib/enums/Color';
import Brand from '../../lib/enums/Brand';

// helpers
import { toastError } from '../../lib/helpers/toastHandlers';

// functions
import { addReview } from '../../lib/functions/product';

const ViewProduct = () => {
  const { slug } = useParams();
  const [, { addToCart, removeFromCart, exists, cartDrawer }] = useCart();
  const [infoHeight, setInfoHeight] = useState(0);
  const { loading, product, loadProduct } = useGetPopulatedProduct({
    slug,
    delay: 500,
  });
  const { total } = useGetTotalProducts({
    productId: product._id,
    related: true,
  });
  const limit = useBreakpointValue([1, 1, 2, 3, 5]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(state => state.user);
  const toast = useToast();
  const location = useLocation();

  const userRating = product.ratings.find(
    ({ postedBy }) => postedBy === user._id
  );

  const brand = Brand.getKeys({ original: true }).find(
    key => key.toLowerCase() === product.brand.toLowerCase()
  );

  const color = Color.getKeys({ original: true }).find(
    key => key.toLowerCase() === product.color.toLowerCase()
  );

  if (loading)
    return (
      <Center w="full" h="100vh">
        <Spinner size="xl" color="yellow.400" />
      </Center>
    );

  async function handleRate(star) {
    const authtoken = user.token;
    try {
      await addReview({
        star,
        productId: product._id,
        authtoken,
      });
      loadProduct(slug, false);
    } catch (err) {
      console.log(err);
      if (err.response.status === 400)
        toast(toastError(err.response.data.message));
    }
  }

  function handleAdd() {
    if (product && !exists.current[product._id]) {
      addToCart({ ...product, count: 1 });
      cartDrawer.open();
    }
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" py={10} gap={2} px={4}>
      <GridItem colSpan={[12, 12, 12, 8]} colStart={1} px={4} overflow="hidden">
        <Carousel
          height={infoHeight}
          images={product.images}
          title={product.title}
        />
      </GridItem>
      <GridItem colSpan={[12, 12, 6, 4]} colStart={[1, 1, 1, 9]} p={0}>
        <InfoList
          title={product.title}
          rating={
            <RatingDisplay
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              maxStars={5}
              onRate={handleRate}
              defaultValue={userRating?.star}
              ratings={product.ratings.map(({ star }) => star)}
            >
              Leave your rating
            </RatingDisplay>
          }
          actions={
            <ProductActions
              userLoggedIn={user.role}
              userRated={userRating}
              exists={exists.current[product._id]}
              title={product.title}
              onRateClick={onOpen}
              onAddClick={() => (product.quantity > 0 ? handleAdd() : null)}
              onRemoveClick={() => removeFromCart(product)}
              disableAddToCart={product.quantity < 1}
              context={product}
            />
          }
          setHeight={setInfoHeight}
        >
          <InfoListItem title="Price">
            <Tag colorScheme="green">
              {format(product.price, { code: 'USD' })}
            </Tag>
          </InfoListItem>
          {product.category && (
            <InfoListItem title="Category">
              <CLink
                as={Link}
                to={`/category/${product.category.slug}`}
                color="blue.500"
              >
                {product.category.name}
              </CLink>
            </InfoListItem>
          )}
          {product.subs.length && (
            <InfoListItem title="Sub Categories">
              {product.subs.map(({ name, _id, slug }) => (
                <CLink
                  as={Link}
                  key={_id}
                  to={`/sub-category/${slug}`}
                  state={location}
                  color="blue.500"
                >
                  {name}
                </CLink>
              ))}
            </InfoListItem>
          )}
          <InfoListItem title="Color">
            <Text>{color}</Text>
          </InfoListItem>
          <InfoListItem title="Brand">
            <Text>{brand}</Text>
          </InfoListItem>
          <InfoListItem title="Available">
            <Tag colorScheme="red">
              {product.quantity}
              <Icon
                as={FontAwesomeIcon}
                icon={['fal', 'long-arrow-down']}
                ml={2}
              />
            </Tag>
          </InfoListItem>
          <InfoListItem title="Sold">
            <Text>{product.sold}</Text>
          </InfoListItem>
        </InfoList>
      </GridItem>
      <GridItem colSpan={[12, 12, 6, 12]}>
        <DescriptionTab description={product.description} />
      </GridItem>
      <GridItem colSpan={[12]}>
        <Divider />
      </GridItem>
      <GridItem colSpan={12}>
        <ProductDisplay
          limit={limit}
          total={total}
          related
          productId={product?._id}
        >
          Related Products
        </ProductDisplay>
      </GridItem>
    </Grid>
  );
};

export default ViewProduct;
