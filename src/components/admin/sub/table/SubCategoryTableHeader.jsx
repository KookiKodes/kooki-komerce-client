import {
  Editable,
  EditableInput,
  EditablePreview,
  GridItem,
  Flex,
  Divider,
  Tag,
} from '@chakra-ui/react';

function SubCategoryTableHeader({ parent, keyword, setBy, setKeyword }) {
  return (
    <GridItem
      as={Flex}
      flexDir="column"
      colSpan={4}
      rowSpan={1}
      alignItems="center"
      py={2}
    >
      <Editable
        placeholder="Sub-categories"
        fontSize="2xl"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        w="full"
        justifyContent="center"
        value={keyword}
        onEdit={() => setBy('Name')}
        onChange={e => setKeyword(e)}
        position="relative"
      >
        <Tag
          position="absolute"
          left={0}
          colorScheme="blue"
          textTransform="uppercase"
        >
          {parent.name}
        </Tag>
        <EditableInput px={4} w="min-content" minW="min-content" />
        <EditablePreview />
      </Editable>
      <Divider my={4} />
    </GridItem>
  );
}

export default SubCategoryTableHeader;
