import { Th, Text, Center } from '@chakra-ui/react';

const CartRowHeader = ({ styles, children }) => {
  return (
    <Th py={6} bg={styles.bg} borderWidth="1px">
      <Center>
        <Text color={styles.headColor}>{children}</Text>
      </Center>
    </Th>
  );
};

export default CartRowHeader;
