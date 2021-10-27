import { Link } from 'react-router-dom';
import {
  Flex,
  List,
  ListItem,
  Link as CLink,
  useColorModeValue,
} from '@chakra-ui/react';

const links = [
  { name: 'History', to: 'history' },
  { name: 'Password', to: 'password' },
  { name: 'Wishlist', to: 'wishlist' },
];

const UserNav = () => {
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  return (
    <Flex
      alignItems="start"
      justifyContent="center"
      p={6}
      borderRight="2px"
      borderColor={borderColor}
    >
      <List display="flex" flexDir="column" spacing={2} colorScheme="blue">
        {links.map(({ name, to }) => {
          return (
            <ListItem key={to}>
              <CLink
                as={Link}
                to={to}
                color="blue.600"
                textTransform="uppercase"
              >
                {name}
              </CLink>
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
};

export default UserNav;
