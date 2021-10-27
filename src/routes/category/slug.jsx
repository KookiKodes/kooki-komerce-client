// packages
import { Grid, GridItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';

// components
import Jumbotron from '../../components/Jumbotron';
import ProductCard from '../../components/ProductCard';

// hooks
import useGetCategoryWithProducts from '../../lib/hooks/useGetCategoryWithProducts';

const CategoryHome = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, category, products } = useGetCategoryWithProducts({
    slug,
    load: true,
  });

  function handleView({ context }) {
    navigate(`/product/${context.slug}`, { from: location });
  }

  function handleAdd({ context }) {
    //
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={10} pb={20}>
      <GridItem colSpan={12}>
        {/* <Center>
          <Skeleton isLoaded={!loading}>
            <Heading>
              {products.length} Products in{' '}
              <Tag fontSize="4xl" colorScheme="yellow">
                "{category.name}"
              </Tag>{' '}
              category
            </Heading>
          </Skeleton>
        </Center>
        <Divider py={4} /> */}
        <Jumbotron typewriter={false}>
          {products?.length}{' '}
          {products?.length > 1 ? 'Products in ' : 'Product in '}"
          {category?.name}" category
        </Jumbotron>
      </GridItem>
      <GridItem colSpan={10} colStart={[2]}>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {products.map((product, index) => {
            return (
              <GridItem key={index} colSpan={[12, 12, 6, 4, 3]}>
                <ProductCard
                  loading={loading}
                  product={product}
                  onAdd={handleAdd}
                  onView={handleView}
                />
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default CategoryHome;
