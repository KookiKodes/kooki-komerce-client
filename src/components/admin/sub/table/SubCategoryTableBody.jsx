import { GridItem, Flex, Grid } from '@chakra-ui/react';

// components
import CreateSubCategoryForm from './CreateSubCategoryForm';

function SubCategoryTableBody({ parent, token, children, ...rest }) {
  return (
    <GridItem as={Flex} w="full" rowSpan={1} colSpan={4}>
      <Grid
        w="full"
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(2, min-content)"
      >
        <GridItem as={Flex} rowSpan={1} colSpan={4} w="full">
          <Grid
            w="full"
            templateColumns="repeat(4, 1fr)"
            templateRows="repeat(2, min-content)"
            my={4}
            rounded="md"
            overflow="hidden"
            transition="all ease .3s"
            border="2px"
            borderColor="gray.500"
            _hover={{ shadow: 'dark-lg' }}
          >
            <GridItem colSpan={4} rowSpan={1}>
              <CreateSubCategoryForm
                onCreate={rest.onCreate}
                parent={parent}
                token={token}
              />
            </GridItem>
            <GridItem colSpan={4} rowSpan={1}>
              {children}
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </GridItem>
  );
}

export default SubCategoryTableBody;
