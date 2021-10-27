import { GridItem, Heading, Flex } from '@chakra-ui/react';

function SubCategoryTableFooter() {
  return (
    <GridItem
      as={Flex}
      colSpan={4}
      rowSpan={1}
      w="full"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      <Heading size="xs">List of all sub-categories</Heading>
    </GridItem>
  );
}

export default SubCategoryTableFooter;
