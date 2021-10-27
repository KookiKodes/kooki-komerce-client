import { Tbody } from '@chakra-ui/react';

const CartTableBody = ({ children, ...props }) => {
  return <Tbody {...props}>{children}</Tbody>;
};

export default CartTableBody;
