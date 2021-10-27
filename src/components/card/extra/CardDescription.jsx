import { Text, Container, useColorModeValue } from '@chakra-ui/react';

import React from 'react';

const CardDescription = ({ children }) => {
  const color = useColorModeValue('gray.500', 'whiteAlpha.600');

  return (
    <Container position="relative" color={color} p={0}>
      <Text textAlign="left" size="sm" noOfLines={3}>
        {children}
      </Text>
    </Container>
  );
};

export default CardDescription;
