// packages
import { Grid, GridItem, Center, Heading, Divider } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ceil } from 'lodash';

// components
import ProductCard from './ProductCard';
import Pagination from './pagination';

// hooks
import useGetSortedProducts from '../lib/hooks/useGetProducts';
import useCart from '../lib/hooks/useCart';

// utility

const ProductDisplay = ({
  total = 8,
  sort = 'createdAt',
  order = 'desc',
  limit = 3,
  related = false,
  productId,
  delay = 0,
  children,
}) => {
  const totalPages = ceil(total / limit);
  const { loading, products, loadProducts } = useGetSortedProducts({
    limit,
    sort,
    order,
    related,
    productId,
    delay,
    load: true,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [, { addToCart, exists, cartDrawer }] = useCart();

  function handleView({ context }) {
    navigate(`/product/${context.slug}`, { from: location });
  }

  function handleAdd({ context }) {
    if (context && !exists.current[context._id]) {
      addToCart({ ...context, count: 1 });
      cartDrawer.open();
    }
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={12}>
      <GridItem colSpan={12}>
        <Center pt={10}>
          <Heading>{children}</Heading>
        </Center>
      </GridItem>

      <GridItem colSpan={10} colStart={2}>
        <Divider rounded="md" shadow="dark-lg" />
      </GridItem>

      <GridItem colSpan={10} colStart={2} w="full" position="relative">
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {products.map((product, index) => {
            let tooltip = `Add ${product?.title} to cart.`;
            if (product?._id && exists.current[product?._id])
              tooltip = `${product?.title} already in cart.`;
            return (
              <GridItem key={index} colSpan={[12, 12, 6, 4, 3]}>
                <ProductCard
                  loading={loading}
                  product={product}
                  tooltip={tooltip}
                  onAdd={handleAdd}
                  onView={handleView}
                />
              </GridItem>
            );
          })}
        </Grid>

        <GridItem colSpan={10}>
          <Center py={5}>
            {totalPages > 0 && (
              <Pagination
                onChange={loadProducts}
                onLoad={loadProducts}
                pageCount={totalPages}
              />
            )}
          </Center>
        </GridItem>
      </GridItem>
    </Grid>
  );
};

export default ProductDisplay;
