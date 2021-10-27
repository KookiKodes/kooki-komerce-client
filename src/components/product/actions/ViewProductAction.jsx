import { Icon, Box, Button, Stack, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewProductAction = ({ children, name, onView, context, ...props }) => {
  function handleClick() {
    onView({ context });
  }

  return (
    <Tooltip label={`View ${name} product page.`}>
      <Button as={Stack} onClick={handleClick} {...props}>
        <Box>
          <Icon as={FontAwesomeIcon} icon={['fal', 'eye']} />
        </Box>
        <Box>{children}</Box>
      </Button>
    </Tooltip>
  );
};

export default ViewProductAction;
