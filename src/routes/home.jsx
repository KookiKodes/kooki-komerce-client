import {
  Grid,
  GridItem,
  Heading,
  useBreakpointValue,
  Center,
  Divider,
} from '@chakra-ui/react';

// components
import Jumbotron from '../components/Jumbotron';
import ProductDisplay from '../components/ProductDisplay';
import QuickLinkList from '../components/QuickLinkList';

// hooks
import useGetTotalProducts from '../lib/hooks/useGetTotalProducts';
import useGetCategories from '../lib/hooks/useGetCategories';
import useGetSubCategories from '../lib/hooks/useGetSubCategories';

const Home = () => {
  const { total } = useGetTotalProducts();
  const limit = useBreakpointValue([1, 1, 2, 3, 4]);
  const { categories } = useGetCategories({
    load: true,
  });
  const { subCategories } = useGetSubCategories({
    load: true,
  });

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={12} w="full" pb={20}>
      <GridItem colSpan={12} w="full">
        <Jumbotron>
          {['Latest Products', 'New Arrivals', 'Best Sellers']}
        </Jumbotron>
      </GridItem>
      <GridItem colSpan={12} w="full">
        <ProductDisplay
          total={total}
          sort="createdAt"
          order="desc"
          limit={limit}
        >
          New Arrivals
        </ProductDisplay>
      </GridItem>
      <GridItem colSpan={12} w="full">
        <ProductDisplay total={total} sort="sold" order="desc" limit={limit}>
          Best Sellers
        </ProductDisplay>
      </GridItem>
      <GridItem colSpan={10} colStart={2}>
        <Divider />
      </GridItem>
      <GridItem
        display="flex"
        flexDir="column"
        colSpan={10}
        colStart={2}
        my={4}
      >
        <Center py={4}>
          <Heading>Categories</Heading>
        </Center>
        <QuickLinkList prefix="category" links={categories} />
      </GridItem>
      <GridItem colSpan={10} colStart={2}>
        <Divider />
      </GridItem>
      <GridItem
        display="flex"
        flexDir="column"
        colSpan={10}
        colStart={2}
        my={4}
      >
        <Center py={4}>
          <Heading>Sub-categories</Heading>
        </Center>
        <QuickLinkList prefix="sub-category" links={subCategories} />
      </GridItem>
    </Grid>
  );
};

export default Home;
