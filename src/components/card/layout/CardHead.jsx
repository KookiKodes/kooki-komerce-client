import { Box } from '@chakra-ui/react';

const CardHead = ({ children, ...props }) => {
  return (
    <Box rounded="md" overflow="hidden" w="full" {...props}>
      {children}
    </Box>
  );
};

export default CardHead;
