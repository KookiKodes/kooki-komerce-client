// packages
import {
  Heading,
  Grid,
  GridItem,
  Stack,
  Divider,
  Skeleton,
  Tag,
  SkeletonText,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { format } from 'currency-formatter';
import { useNavigate, useLocation } from 'react-router-dom';
import delay from 'delay';

// components
import Card from '../../components/card';
import CardHead from '../../components/card/layout/CardHead';
import CardBody from '../../components/card/layout/CardBody';
import CardFoot from '../../components/card/layout/CardFoot';
import CardImage from '../../components/card/extra/CardImage';
import CardDescription from '../../components/card/extra/CardDescription';
import CardActions from '../../components/card/extra/CardActions';
import UpdateProductAction from '../../components/admin/actions/UpdateProductAction';
import DeleteAction from '../../components/admin/actions/DeleteAction';

// functions
import { getProductsByCount, removeProduct } from '../../lib/functions/product';
import CardTitle from '../../components/card/extra/CardTitle';

// helpers
import { toastError, toastSuccess } from '../../lib/helpers/toastHandlers';

const AdminProducts = ({ authtoken }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const styles = useColorModeValue(
    {
      bg: 'gray.100, gray.200',
      border: 'gray.300',
    },
    {
      bg: 'whiteAlpha.200, whiteAlpha.100',
      border: 'gray.800',
      psuedoBg: 'gray.500',
    }
  );

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const { data: products } = await getProductsByCount(100);
      setProducts(products);
      await delay(500);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function handleDelete({ context }) {
    const { slug } = context;
    try {
      const { data: product } = await removeProduct({ slug, authtoken });
      setProducts(products =>
        products.filter(({ slug }) => slug !== product.slug)
      );
      toast(
        toastSuccess(
          'Product Deleted',
          `Product ${product.title} was deleted successfully.`
        )
      );
    } catch (err) {
      console.log(err);
      toast(toastError(err.message));
    }
  }

  async function handleUpdate({ context }) {
    navigate(`/admin/product/${context.slug}`, { state: location });
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={8} my={4}>
      <GridItem colSpan={12} w="full" textAlign="center">
        <Heading>All Products</Heading>
        <Divider mt={3} />
      </GridItem>
      <GridItem colSpan={12} w="full" textAlign="center">
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {products.map(product => {
            const price = format(product.price, { code: 'USD' });
            return (
              <GridItem key={product._id} colSpan={[12, 12, 6, 6, 4]}>
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
                      <CardImage
                        src={product.images[0]?.url}
                        alt={product.title}
                      />
                    </CardHead>
                  </Skeleton>
                  <CardBody>
                    <GridItem colSpan={3}>
                      <SkeletonText isLoaded={!loading}>
                        <CardTitle>{product.title}</CardTitle>
                      </SkeletonText>
                    </GridItem>

                    <GridItem
                      as={Stack}
                      direction="row"
                      spacing={1}
                      colSpan={1}
                    >
                      <Skeleton isLoaded={!loading}>
                        <Tag size="md" colorScheme="blue" fontWeight="bold">
                          {product.quantity}
                        </Tag>
                      </Skeleton>
                      <Skeleton isLoaded={!loading}>
                        <Tag size="md" colorScheme="green" fontWeight="bold">
                          {product.sold}
                        </Tag>
                      </Skeleton>
                    </GridItem>
                    <GridItem
                      as={Stack}
                      isInline
                      colSpan={4}
                      shouldWrapChildren
                      spacing={1}
                      colStart={1}
                      w="full"
                      pl={4}
                    >
                      <Skeleton isLoaded={!loading}>
                        <Tag size="sm" colorScheme="green" fontWeight="bold">
                          {price}
                        </Tag>
                      </Skeleton>
                      <Skeleton isLoaded={!loading}>
                        <Tag
                          size="sm"
                          colorScheme={product.color.toLowerCase()}
                          fontWeight="bold"
                        >
                          {product.color}
                        </Tag>
                      </Skeleton>
                      <Skeleton isLoaded={!loading}>
                        <Tag size="sm" colorScheme="blue" fontWeight="bold">
                          {product.brand}
                        </Tag>
                      </Skeleton>
                      <Skeleton isLoaded={!loading}>
                        <Tag size="sm" colorScheme="blue" fontWeight="bold">
                          {product.category.name}
                        </Tag>
                      </Skeleton>
                    </GridItem>
                    <GridItem colSpan={4}>
                      <SkeletonText isLoaded={!loading}>
                        <CardDescription>{product.description}</CardDescription>
                      </SkeletonText>
                    </GridItem>
                  </CardBody>
                  <CardFoot>
                    <GridItem colSpan={1} colStart={4}>
                      <CardActions>
                        <UpdateProductAction
                          isDisabled={loading}
                          name={product.title}
                          context={product}
                          onUpdate={handleUpdate}
                        />
                        <DeleteAction
                          context={product}
                          isDisabled={loading}
                          variant="solid"
                          iconWeight="fas"
                          name={product.title}
                          onDelete={handleDelete}
                        >
                          Are you sure you want to delete ${product.title}{' '}
                          product permanently?
                        </DeleteAction>
                      </CardActions>
                    </GridItem>
                  </CardFoot>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default AdminProducts;
