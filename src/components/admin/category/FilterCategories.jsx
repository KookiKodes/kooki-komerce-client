import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterCategories = ({
  by,
  setBy,
  setKeyword,
  order,
  setOrder,
  keyword,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleChange(e) {
    if (by === 'Name') {
      setKeyword(e.target.value);
    }
  }

  return (
    <InputGroup variant="filled" w={['100%', '100%', '50%']}>
      <InputLeftAddon px={0}>
        <Menu
          px={0}
          mx={0}
          closeOnSelect={false}
          onClose={onClose}
          isOpen={isOpen}
          onOpen={onOpen}
        >
          <MenuButton
            as={Button}
            w="full"
            colorScheme="yellow"
            borderTopRightRadius="none"
            borderBottomRightRadius="none"
          >
            <Icon as={FontAwesomeIcon} icon={['fal', 'filter']} mr={2} />
            {by}
            <Icon
              as={FontAwesomeIcon}
              icon={isOpen ? ['fal', 'chevron-up'] : ['fal', 'chevron-down']}
              ml={2}
            />
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              title="Order"
              type="radio"
              defaultValue={order}
              onChange={e => setOrder(e)}
            >
              <MenuItemOption value="asc">Ascending</MenuItemOption>
              <MenuItemOption value="dsc">Descending</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              title="Filter by"
              type="radio"
              defaultValue={by}
              onChange={e => setBy(e)}
            >
              <MenuItemOption value="Name">Name</MenuItemOption>
              <MenuItemOption value="Created">Created</MenuItemOption>
              <MenuItemOption value="Updated">Updated</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </InputLeftAddon>
      <Input
        mb={6}
        pl={4}
        placeholder="Filter"
        value={keyword}
        onChange={handleChange}
        isDisabled={by !== 'Name'}
      />
    </InputGroup>
  );
};

export default FilterCategories;
