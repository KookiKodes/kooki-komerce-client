// packages
import {
  Tabs,
  Tab,
  TabList,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Icon,
  IconButton,
  Text,
  HStack,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

// components
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Search from '../forms/Search';

// action types
import ActionTypes from '../../lib/enums/ActionTypes';
import Role from '../../lib/enums/Role';

const Header = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const search = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, cart } = useSelector(state => state);

  const logout = async () => {
    signOut(getAuth());
    dispatch({
      type: ActionTypes.logout,
      payload: { role: Role.guest },
    });
    navigate('/guest/login');
  };

  useEffect(() => {
    const logins = ['/guest/login', '/guest/login/forgot-password'];
    const registers = ['/guest/register', '/guest/register/complete'];
    switch (true) {
      case registers.includes(location.pathname):
        return handleTabsChange(5);
      case logins.includes(location.pathname):
        return handleTabsChange(4);
      case location.pathname === '/cart':
        return handleTabsChange(2);
      case location.pathname === '/shop':
        return handleTabsChange(1);
      case location.pathname === '/':
        return handleTabsChange(0);
      default:
    }
  }, [location, tabIndex]);

  const handleTabsChange = index => setTabIndex(index);

  return (
    <Tabs
      display="flex"
      index={tabIndex}
      onChange={handleTabsChange}
      variant="line"
      colorScheme="yellow"
    >
      <TabList flex="auto" display="flex" justifyContent="start" px={5}>
        <Tab h="full" py={3} display="flex" as={Link} to="/">
          <HStack>
            <Icon as={FontAwesomeIcon} icon={['fal', 'home-alt']} />
            <Text>Home</Text>
          </HStack>
        </Tab>
        <Tab h="full" py={3} display="flex" as={Link} to="/shop">
          <HStack>
            <Icon as={FontAwesomeIcon} icon={['fal', 'shopping-bag']} />
            <Text>Shop</Text>
          </HStack>
        </Tab>
        <Tab h="full" py={3} display="flex" as={Link} to="/cart">
          <HStack>
            <Icon as={FontAwesomeIcon} icon={['fal', 'shopping-cart']} />
            <Text>Cart</Text>
            <Badge colorScheme="green">{cart.length}</Badge>
          </HStack>
        </Tab>
      </TabList>
      {!loading && (
        <TabList
          display="flex"
          flex="auto"
          justifyContent="end"
          px={5}
          type="none"
        >
          <Tab
            _active={{ bg: 'none' }}
            _focus={{ shadow: 'none' }}
            onClick={() => search.current.focus()}
            as="div"
          >
            <Search ref={search} />
          </Tab>
          {user.role === Role.guest && (
            <>
              <Tab
                as={Link}
                to="/guest/login"
                h="full"
                py={3}
                display="flex"
                mx={3}
              >
                <HStack>
                  <Icon as={FontAwesomeIcon} icon={['fal', 'user']} />
                  <Text>Login</Text>
                </HStack>
              </Tab>
              <Tab
                as={Link}
                to="/guest/register"
                h="full"
                py={3}
                display="flex"
                mx={3}
              >
                <HStack>
                  <Icon as={FontAwesomeIcon} icon={['fal', 'user-plus']} />
                  <Text>Register</Text>
                </HStack>
              </Tab>
            </>
          )}
          {user.role !== Role.guest && (
            <Tab h="full" p={0} as="div" mx={3}>
              <Menu as={Tab} h="full" isLazy>
                <MenuButton
                  as={Button}
                  p={3}
                  w="full"
                  h="full"
                  tabIndex={-1}
                  leftIcon={
                    <Icon
                      as={FontAwesomeIcon}
                      icon={['fal', 'user-cog']}
                      mr={2}
                    />
                  }
                  variant="flushed"
                >
                  {user.name ? user.name : 'guest'}
                </MenuButton>
                <MenuList m={0}>
                  {(user.role === Role.Admin ||
                    user.role === Role.Subscriber) && (
                    <MenuItem
                      as={Link}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="0"
                      to={
                        user.role === Role.Admin
                          ? '/admin/dashboard'
                          : '/user/history'
                      }
                      state={location}
                      w="full"
                    >
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem
                    as={Button}
                    onClick={logout}
                    variant="ghost"
                    borderRadius="0"
                    rightIcon={
                      <Icon as={FontAwesomeIcon} icon={['fal', 'sign-out']} />
                    }
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Tab>
          )}
          <Tab as="div" p={0}>
            <Menu as={Tab} h="full" isLazy>
              <MenuButton
                as={IconButton}
                h="full"
                icon={<Icon as={FontAwesomeIcon} icon={['fal', 'cog']} />}
                variant="flushed"
              />
              <MenuList p={0}>
                <MenuItem
                  as="div"
                  w="full"
                  h="full"
                  borderRadius="0"
                  px={0}
                  py={2}
                  m={0}
                >
                  <ColorModeSwitcher
                    w="full"
                    h="full"
                    borderRadius="0"
                    p={2}
                    m={0}
                  />
                </MenuItem>
              </MenuList>
            </Menu>
          </Tab>
        </TabList>
      )}
    </Tabs>
  );
};

export default Header;
