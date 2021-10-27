import { Icon, IconButton, Box, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdateProductAction = ({ onUpdate, isDisabled, name, context }) => {
  function handleClick(e) {
    onUpdate({ context });
  }

  return (
    <Box display="inline-block">
      <Tooltip label={`Edit ${name}?`}>
        <IconButton
          colorScheme="yellow"
          icon={<Icon as={FontAwesomeIcon} icon={['fas', 'pencil']} />}
          isDisabled={isDisabled}
          onClick={handleClick}
        />
      </Tooltip>
    </Box>
  );
};

export default UpdateProductAction;
