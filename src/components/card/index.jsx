import { Stack } from '@chakra-ui/react';

const Card = ({ children, ...props }) => {
  return (
    <Stack align="center" rounded="lg" role="group" p={4} {...props}>
      {children}
    </Stack>
  );
};

export default Card;
