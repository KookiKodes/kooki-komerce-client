// packages
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import CreateCategoryForm from '../CreateCategoryForm';

// components
import CategoryRow from './CategoryRow';

function CategoryRows(props) {
  const styles = useColorModeValue(
    { border: 'gray.200' },
    { border: 'gray.600' }
  );
  return (
    <>
      <Grid
        templateColumns="repeat(4, 1fr)"
        w="full"
        templateRows="repeat(2, min-content)"
        rounded="md"
        overflow="hidden"
        transition="all ease .3s"
        border="4px"
        borderColor={styles.border}
        _hover={{ shadow: 'xl' }}
      >
        <GridItem colSpan={4}>
          <CreateCategoryForm updateCategories={props.updateCategories} />
        </GridItem>
        {props.filteredCategories.map((category, index) => {
          return (
            <CategoryRow
              category={category}
              key={index}
              even={index % 2 === 0}
              {...props}
            />
          );
        })}
      </Grid>
    </>
  );
}

export default CategoryRows;
