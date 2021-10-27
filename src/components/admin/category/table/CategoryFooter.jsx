import { GridItem, Flex, Heading } from '@chakra-ui/react';

const CategoryFooter = () => {
  return (
    <GridItem
      as={Flex}
      justifyContent="center"
      w="full"
      rowSpan={1}
      colSpan={4}
    >
      <Heading size="xs">List of all categories</Heading>
    </GridItem>
  );
};

export default CategoryFooter;
