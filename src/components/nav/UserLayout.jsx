import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import UserNav from './UserNav';

const UserLayout = () => {
  return (
    <Flex w="100vw" minH="100vh" h="min-content" overflowX="hidden">
      <UserNav />
      <Outlet />
    </Flex>
  );
};

export default UserLayout;
