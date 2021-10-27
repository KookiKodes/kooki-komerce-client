import { Thead, Tr } from '@chakra-ui/react';

const CartTableHead = ({ children }) => {
  return (
    <Thead>
      <Tr>{children}</Tr>
    </Thead>
  );
};

export default CartTableHead;
