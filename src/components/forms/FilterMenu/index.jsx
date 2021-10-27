import {
  Stack,
  Heading,
  Accordion,
  HStack,
  IconButton,
  Icon,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterMenu = ({ children, onClear }) => {
  const styles = useColorModeValue(
    { border: 'gray.100', bg: 'gray.50' },
    { border: 'whiteAlpha.100', bg: 'whiteAlpha.50' }
  );

  async function handleClear() {
    if (onClear) {
      onClear();
    }
  }

  return (
    <Accordion
      allowToggle
      allowMultiple
      w="full"
      minH="100vh"
      borderRight="1px"
      borderColor={styles.border}
      bg={styles.bg}
    >
      <HStack
        px={6}
        py={4}
        align="center"
        justify="space-around"
        w="full"
        position="relative"
      >
        <Heading>Filter</Heading>
        <Tooltip label="Clear filter">
          <IconButton
            position="absolute"
            right={6}
            variant="ghost"
            colorScheme="red"
            onClick={handleClear}
            icon={
              <Icon as={FontAwesomeIcon} size="2x" icon={['fal', 'times']} />
            }
          />
        </Tooltip>
      </HStack>
      <Stack>{children}</Stack>
    </Accordion>
  );
};

export default FilterMenu;
