import {
  Popover,
  Tooltip,
  Box,
  PopoverTrigger,
  IconButton,
  Icon,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverArrow,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteAction = ({
  name,
  context,
  onDelete,
  isDisabled,
  variant = 'ghost',
  colorScheme = 'red',
  iconWeight = 'fal',
  children,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = useRef(null);

  async function handleDeletion() {
    onClose();
    if (onDelete) onDelete({ context });
  }

  return (
    <Popover
      placement="left"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      initialFocusRef={initialFocusRef}
      isLazy
      color="whiteAlpha.900"
    >
      <Tooltip
        label={`Delete ${name}`}
        aria-label={`Delete category: ${name}`}
        placement="auto"
        hasArrow
        pointerEvents="none"
      >
        <Box display="inline-block">
          <PopoverTrigger>
            <IconButton
              variant={variant}
              colorScheme={colorScheme}
              isDisabled={isDisabled}
              icon={
                <Icon
                  as={FontAwesomeIcon}
                  size="1x"
                  icon={[iconWeight, 'trash']}
                />
              }
            />
          </PopoverTrigger>
        </Box>
      </Tooltip>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="sm">Permanantly Delete?</Heading>
        </PopoverHeader>
        <PopoverBody>
          <Text>{children}</Text>
          <Divider my={3} />
          <ButtonGroup w="full" display="flex" justifyContent="end">
            <Button
              colorScheme="red"
              variant="outline"
              onClick={onClose}
              size="sm"
              aria-label="cancel category deletion"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeletion}
              colorScheme="green"
              aria-label="confirm category deletion"
              size="sm"
              ref={initialFocusRef}
            >
              Confirm
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteAction;
