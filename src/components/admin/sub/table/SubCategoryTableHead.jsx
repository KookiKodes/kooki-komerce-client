// packages
import { Flex, Grid, GridItem, Badge, Button } from '@chakra-ui/react';

// components
import FilteredByDisplay from '../../FilteredByDisplay';

function SubCategoryTableHead({ order, by, setOrder, setBy }) {
  return (
    <GridItem as={Flex} w="full" rowSpan={1} colSpan={4}>
      <Grid w="full" templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={1}>
          <FilteredByDisplay
            order={order}
            by={by}
            setOrder={setOrder}
            setBy={setBy}
          >
            Name
          </FilteredByDisplay>
        </GridItem>
        <GridItem colSpan={1}>
          <FilteredByDisplay
            order={order}
            by={by}
            setOrder={setOrder}
            setBy={setBy}
          >
            Created
          </FilteredByDisplay>
        </GridItem>
        <GridItem colSpan={1}>
          <FilteredByDisplay
            order={order}
            by={by}
            setOrder={setOrder}
            setBy={setBy}
          >
            Updated
          </FilteredByDisplay>
        </GridItem>
        <GridItem colSpan={1}>
          <Badge colorScheme="blue" as={Button} px={2} pointerEvents="none">
            Actions
          </Badge>
        </GridItem>
      </Grid>
    </GridItem>
  );
}

export default SubCategoryTableHead;
