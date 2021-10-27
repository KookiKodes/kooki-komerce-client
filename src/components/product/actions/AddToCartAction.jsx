// packages
import { Icon, Box, Button, Stack, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddToCartAction = ({
  children,
  tooltip,
  name,
  onAdd,
  context,
  ...props
}) => {
  function handleClick() {
    if (!props.disabled) {
      onAdd({ context });
    }
  }

  return (
    <Tooltip label={tooltip} aria-label={tooltip}>
      <Button as={Stack} name={name} onClick={handleClick} {...props}>
        <Box>
          <Icon as={FontAwesomeIcon} icon={['fal', 'cart-plus']} />
        </Box>
        <Box>{children}</Box>
      </Button>
    </Tooltip>
  );
};

export default AddToCartAction;
