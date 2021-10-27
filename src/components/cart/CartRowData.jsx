import { Td, Center } from '@chakra-ui/react';

const CartRowData = ({ children, styles }) => {
  return (
    <Td p={2} borderWidth="1px" overflowWrap="break-word">
      <Center color={styles.color} fontSize={['sm', 'sm', 'md', 'lg', 'xl']}>
        {children}
      </Center>
    </Td>
  );
};

export default CartRowData;
