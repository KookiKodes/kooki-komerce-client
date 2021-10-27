//packages
import {
  Tag,
  Stack,
  Icon,
  GridItem,
  useColorModeValue,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'currency-formatter';

// components
import Card from './card';
import CardHead from './card/layout/CardHead';
import CardTitle from './card/extra/CardTitle';
import CardImage from './card/extra/CardImage';
import CardDescription from './card/extra/CardDescription';
import CardBody from './card/layout/CardBody';
import CardFoot from './card/layout/CardFoot';
import RatingDisplay from './product/rating';
import CardActions from './card/extra/CardActions';
import AddToCartAction from './product/actions/AddToCartAction';
import ViewProductAction from './product/actions/ViewProductAction';

const ProductCard = ({ product, loading, onAdd, onView, tooltip }) => {
  const price = format(product.price, { code: 'USD' });
  const styles = useColorModeValue(
    {
      bg: 'gray.100, gray.200',
      border: 'gray.300',
    },
    {
      bg: 'whiteAlpha.200, whiteAlpha.100',
      border: 'gray.800',
    }
  );

  function handleAdd(context) {
    if (onAdd) onAdd(context);
  }

  function handleView(context) {
    if (onView) onView(context);
  }

  return (
    <Card
      bgGradient={`linear(to-br, ${styles.bg})`}
      spacing={4}
      border="1px"
      borderColor={styles.border}
      position="relative"
      shadow="md"
      transition="background-image .3s ease, box-shadow .3s ease"
      _hover={{
        shadow: '2xl',
      }}
    >
      <Skeleton isLoaded={!loading}>
        <CardHead>
          <CardImage src={product.images[0]?.url} alt={product.title} />
        </CardHead>
      </Skeleton>
      <CardBody>
        <GridItem colSpan={2}>
          <SkeletonText isLoaded={!loading}>
            <CardTitle>{product.title}</CardTitle>
          </SkeletonText>
        </GridItem>

        <GridItem as={Stack} direction="row" spacing={1} colSpan={2}>
          <Skeleton isLoaded={!loading}>
            <Tag size="md" colorScheme="green" fontWeight="bold">
              {price}
            </Tag>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Tag size="md" colorScheme="red" fontWeight="bold">
              {product.quantity}
              <Icon
                as={FontAwesomeIcon}
                icon={['fal', 'long-arrow-down']}
                ml={2}
              />
            </Tag>
          </Skeleton>
        </GridItem>
        <GridItem colSpan={4}>
          <Skeleton isLoaded={!loading}>
            <RatingDisplay
              maxStars={5}
              ratings={product?.ratings?.map(({ star }) => star)}
            />
          </Skeleton>
        </GridItem>

        <GridItem colSpan={4}>
          <SkeletonText isLoaded={!loading}>
            <CardDescription>{product.description}</CardDescription>
          </SkeletonText>
        </GridItem>
      </CardBody>
      <CardFoot>
        <GridItem colSpan={4} w="full">
          <CardActions w="full">
            <ViewProductAction
              context={product}
              onView={handleView}
              name={product.title}
              borderRightRadius="none"
              py={8}
              spacing={2}
              colorScheme="blue"
              variant="outline"
              fontWeight="normal"
              cursor="pointer"
              bg="whiteAlpha.100"
              flex="auto"
            >
              View Product
            </ViewProductAction>
            <AddToCartAction
              context={product}
              onAdd={handleAdd}
              name={product.title}
              tooltip={tooltip}
              borderLeftRadius="none"
              py={8}
              spacing={2}
              flex="auto"
              colorScheme="green"
              variant="outline"
              cursor="pointer"
              fontWeight="normal"
              bg="whiteAlpha.100"
              disabled={product.quantity < 1}
            >
              {product.quantity > 0 && 'Add To Cart'}
              {product.quantity < 1 && 'Out of Stock'}
            </AddToCartAction>
          </CardActions>
        </GridItem>
      </CardFoot>
    </Card>
  );
};

export default ProductCard;
