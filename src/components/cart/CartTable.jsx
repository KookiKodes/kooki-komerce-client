import { Table } from '@chakra-ui/react';

const CartTable = ({ children }) => {
  return (
    <Table w="full" rounded="md" overflow="hidden">
      {children}
    </Table>
  );
};

export default CartTable;
