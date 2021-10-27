// packages
import {
  Grid,
  GridItem,
  Heading,
  Center,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { emitCustomEvent } from 'react-custom-events';
import { isEqual } from 'lodash';

// components
import ProductCard from '../components/ProductCard';
import FilterMenu from '../components/forms/FilterMenu';
import FilterItem from '../components/forms/FilterMenu/FilterItem';
import FilterButton from '../components/forms/FilterMenu/FilterButton';
import FilterContent from '../components/forms/FilterMenu/FilterContent';
import PriceRangeSlider from '../components/forms/PriceRangeSlider';
import CategoriesCheckboxes from '../components/forms/CategoriesCheckboxes';
import RatingSelector from '../components/forms/RatingSelector';
import SubCategoriesSelector from '../components/forms/SubCategoriesSelector';
import BrandCheckBoxes from '../components/forms/BrandCheckBoxes';
import ColorCheckboxes from '../components/forms/ColorCheckboxes';
import ShippingCheckBox from '../components/forms/ShippingCheckbox';

// static
import initialState from '../lib/static/initialFilterState';

// hooks
import useGetProductsByFilter from '../lib/hooks/useGetProductsByFilter';
import useGetCategories from '../lib/hooks/useGetCategories';
import useGetSubCategories from '../lib/hooks/useGetSubCategories';
import useCart from '../lib/hooks/useCart';

const Shop = () => {
  const [, { exists, addToCart, cartDrawer }] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { text } = useSelector(state => state.search);
  const { products, loading, filter, updateFilter, resetFilter } =
    useGetProductsByFilter({
      load: true,
    });
  const { categories, loading: loadingCategories } = useGetCategories({
    load: true,
  });

  const { subCategories } = useGetSubCategories({
    load: true,
  });

  useEffect(() => {
    if (text !== filter.query) {
      updateFilter('query', text);
    }
  }, [text, filter.query, updateFilter]);

  function handleView({ context }) {
    if (products[0]._id) {
      navigate(`/product/${context.slug}`, { state: location });
    }
  }

  function handleClear() {
    if (!isEqual(filter, initialState)) {
      resetFilter();
      emitCustomEvent('clear-filter');
    }
  }

  function handleAdd({ context }) {
    if (context && !exists.current[context._id]) {
      addToCart({ ...context, count: 1 });
      cartDrawer.open();
    }
  }

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      templateRows="min-content 1fr"
      gap={6}
      position="relative"
    >
      <GridItem
        colSpan={[8, 8, 8, 8, 10]}
        colStart={[5, 5, 5, 5, 3]}
        pt={6}
        rowStart={1}
      >
        <Center>
          <Heading>
            {products.length < 1 || !products[0]._id
              ? 'No Products Found'
              : `${products.length} products found`}
          </Heading>
        </Center>
      </GridItem>
      <GridItem
        colSpan={[4, 4, 4, 4, 2]}
        position="relative"
        rowStart={1}
        rowEnd={3}
        w="full"
        as={Flex}
      >
        <FilterMenu onClear={handleClear}>
          <FilterItem>
            <FilterButton>
              <Icon as={FontAwesomeIcon} icon={['fal', 'usd-circle']} />
              <Text fontSize="xl">Price</Text>
            </FilterButton>
            <FilterContent>
              <PriceRangeSlider
                step={10}
                defaultValue={[100, 10000]}
                min={100}
                max={10000}
                onChange={value => updateFilter('price', value)}
              />
            </FilterContent>
          </FilterItem>
          <FilterItem>
            <FilterButton>
              <Icon as={FontAwesomeIcon} icon={['fal', 'check-square']} />
              <Text fontSize="xl">Category</Text>
            </FilterButton>
            <FilterContent>
              <CategoriesCheckboxes
                loading={loadingCategories}
                categories={categories}
                onCheck={value => updateFilter('category', value)}
              />
            </FilterContent>
          </FilterItem>
          <FilterItem>
            <FilterButton>
              <Icon as={FontAwesomeIcon} icon={['fas', 'star']} />
              <Text fontSize="xl">Rating</Text>
            </FilterButton>
            <FilterContent>
              <RatingSelector
                defaultValue={1}
                maxStars={5}
                onSelect={value => updateFilter('stars', value)}
              />
            </FilterContent>
          </FilterItem>
          <FilterItem>
            <FilterButton>
              <Icon as={FontAwesomeIcon} icon={['fal', 'tags']} />
              <Text fontSize="xl">Sub-categories</Text>
            </FilterButton>
            <FilterContent>
              <SubCategoriesSelector
                subs={subCategories}
                onSelect={value => updateFilter('subs', value)}
              />
            </FilterContent>
          </FilterItem>
          <FilterItem>
            <FilterButton>
              <Icon as={FontAwesomeIcon} icon={['fal', 'fill-drip']} />
              <Text fontSize="xl">Color</Text>
            </FilterButton>
            <FilterContent>
              <ColorCheckboxes
                onSelect={value => updateFilter('color', value)}
              />
            </FilterContent>
          </FilterItem>
          <FilterItem>
            <FilterButton>
              <Icon as={FontAwesomeIcon} icon={['fal', 'copyright']} />
              <Text fontSize="xl">Brand</Text>
            </FilterButton>
            <FilterContent>
              <BrandCheckBoxes
                onSelect={value => updateFilter('brand', value)}
              />
            </FilterContent>
          </FilterItem>
          <FilterItem>
            <FilterButton>
              <Icon as={FontAwesomeIcon} icon={['fal', 'shipping-fast']} />
              <Text fontSize="xl">Shipping</Text>
            </FilterButton>
            <FilterContent>
              <ShippingCheckBox
                onSelect={value => updateFilter('shipping', value)}
              />
            </FilterContent>
          </FilterItem>
        </FilterMenu>
      </GridItem>
      <GridItem
        colSpan={[8, 8, 8, 8, 10]}
        colStart={[5, 5, 5, 5, 3]}
        rowStart={2}
        pb={6}
        pr={6}
      >
        <Grid templateColumns="repeat(12, 1fr)" gap={12}>
          {products.map((product, index) => {
            const tooltip = exists.current[product?._id]
              ? `${product.title} already in cart.`
              : `Add ${product.title} to cart.`;
            return (
              <GridItem key={index} colSpan={[12, 12, 6, 6, 4]}>
                {product._id && (
                  <ProductCard
                    loading={loading}
                    product={product}
                    onView={handleView}
                    tooltip={tooltip}
                    onAdd={handleAdd}
                  />
                )}
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Shop;
