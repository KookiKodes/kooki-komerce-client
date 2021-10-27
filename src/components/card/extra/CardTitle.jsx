import { Heading, Container } from '@chakra-ui/react';

import React from 'react';

const CardTitle = ({ children, ...props }) => {
  return (
    <Container position="relative" p={0}>
      <Heading textAlign="left" size="md" isTruncated {...props}>
        {children}
      </Heading>
    </Container>
  );
};

export default CardTitle;
