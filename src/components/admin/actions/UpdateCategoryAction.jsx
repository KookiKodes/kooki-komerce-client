import {
  Popover,
  Text,
  InputLeftAddon,
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
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  ButtonGroup,
  Button,
  useDisclosure,
  useBoolean,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdateCategoryAction = ({ name, onUpdate, isDisabled }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [value, setValue] = useState();
  const [error, setError] = useBoolean();
  const initialFocusRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (value !== name || !value) {
      await onUpdate(value);
      setValue('');
      onClose();
    } else {
      setError.on();
    }
  }

  function handleClose() {
    setValue('');
    setError.off();
    onClose();
  }

  return (
    <Popover
      placement="left"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={handleClose}
      initialFocusRef={initialFocusRef}
      isLazy
      lazyBehavior
      flip
    >
      <Tooltip
        label={`Update ${name}`}
        aria-label={`Update category: ${name}`}
        colorScheme="red"
        placement="left"
        hasArrow
        pointerEvents="none"
      >
        <Box display="inline-block">
          <PopoverTrigger>
            <IconButton
              variant="ghost"
              colorScheme="yellow"
              isDisabled={isDisabled}
              icon={<Icon as={FontAwesomeIcon} icon={['fal', 'pencil']} />}
            />
          </PopoverTrigger>
        </Box>
      </Tooltip>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Heading size="sm">Update {name}</Heading>
        </PopoverHeader>
        <PopoverBody as="form" onSubmit={handleSubmit}>
          <FormControl id={name} pb={6} isRequired isInvalid={error}>
            <FormLabel fontSize="md">
              {value ? `From ${name}` : 'Change name'}
            </FormLabel>
            <InputGroup>
              <InputLeftAddon as="label" htmlFor={name}>
                <Text>To:</Text>
              </InputLeftAddon>
              <Input
                type="text"
                placeholder={name}
                ref={initialFocusRef}
                onChange={e => setValue(e.target.value)}
                autoFocus
              />
              <InputRightElement as="label" htmlFor={name}>
                <Icon as={FontAwesomeIcon} icon={['fal', 'edit']} />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              Name cannot be the same or empty!
            </FormErrorMessage>
          </FormControl>
          <ButtonGroup w="full" display="flex" justifyContent="end">
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleClose}
              aria-label="cancel category update"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              aria-label="save category"
              size="sm"
              type="submit"
            >
              Save
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default UpdateCategoryAction;
