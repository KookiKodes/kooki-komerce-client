import { ButtonGroup } from '@chakra-ui/react';

const CardActions = ({ children, ...props }) => {
  return (
    <ButtonGroup w="full" spacing="2" {...props}>
      {children}
    </ButtonGroup>
  );
};

export default CardActions;
