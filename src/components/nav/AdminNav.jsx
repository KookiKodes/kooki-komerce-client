import { Link, useLocation } from 'react-router-dom';
import {
  Flex,
  List,
  ListItem,
  ListIcon,
  Link as CLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const links = [
  {
    name: 'Dashboard',
    to: 'dashboard',
    icon: ['fal', 'columns'],
  },
  { name: 'Product', to: 'product', icon: ['fal', 'box'] },
  { name: 'Products', to: 'products', icon: ['fal', 'boxes'] },
  { name: 'Categories', to: 'categories', icon: ['fal', 'sitemap'] },
  { name: 'Coupons', to: 'coupons', icon: ['fal', 'tags'] },
];

const AdminNav = () => {
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  const linkColor = useColorModeValue(
    { active: 'yellow.600', color: 'blue.400' },
    { active: 'yellow.200', color: 'blue.600' }
  );
  const location = useLocation();
  return (
    <Flex
      alignItems="start"
      justifyContent="center"
      p={6}
      borderRight="2px"
      borderColor={borderColor}
      minH="100vh"
      w="full"
    >
      <List
        display="flex"
        flexDir="column"
        spacing={5}
        colorScheme="blue"
        position="fixed"
      >
        {links.map(({ name, icon, to }) => {
          const activeArr = location.pathname.split('/');
          const active = activeArr[activeArr.length - 1] === to;

          return (
            <ListItem
              key={to}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <CLink
                as={Link}
                _active={{ color: linkColor.active }}
                to={to}
                color={active ? linkColor.active : linkColor.color}
                textTransform="uppercase"
                pr={10}
              >
                {name}
              </CLink>
              <ListIcon
                as={FontAwesomeIcon}
                icon={icon}
                color={active ? 'yellow.500' : 'blue.700'}
              />
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
};

export default AdminNav;
