import {
  Heading,
  Tooltip,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Icon,
  Editable,
  EditableInput,
  EditablePreview,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

//components
import EditableControls from '../EditableControls';

const CreateSubCategoryForm = ({ parent, onCreate, token }) => {
  const [name, setName] = useState('');
  const styles = useColorModeValue(
    {
      bg: 'yellow.400',
      color: 'yellow.900',
    },
    {
      bg: 'yellow.700',
      color: 'yellow.200',
    }
  );

  async function handleCreate(e) {
    e.preventDefault();
    await onCreate(name);
    setName('');
  }

  return (
    <Editable
      w="full"
      value={name}
      onSubmit={e => setName(e)}
      onChange={e => setName(e)}
      placeholder={`Name`}
      fontWeight="bold"
      fontSize="xl"
      color={styles.color}
    >
      <Grid
        as="form"
        w="full"
        py={4}
        px={2}
        size="lg"
        templateColumns="repeat(4, 1fr)"
        bg={styles.bg}
        onSubmit={handleCreate}
      >
        <GridItem as={Flex} alignItems="center" colSpan={3} px={4}>
          <Badge fontSize={16} colorScheme="orange" mr={4}>
            new sub-category
            <Icon
              as={FontAwesomeIcon}
              icon={['fal', 'long-arrow-right']}
              ml={2}
            />
          </Badge>
          <EditableInput
            display="flex"
            alignItems="center"
            justifyContent="center"
            _placeholder={{ color: styles.color }}
            my={0}
            h="full"
            px={2}
          />
          <EditablePreview
            as={Heading}
            display="flex"
            alignItems="center"
            justifyContent="center"
            size="md"
            my={0}
            px={2}
            h="full"
          />
        </GridItem>
        <GridItem
          as={ButtonGroup}
          size="md"
          spacing={0}
          colSpan={1}
          w="full"
          h="full"
        >
          <EditableControls />
          <Tooltip label="Create" aria-label="Create">
            <IconButton
              colorScheme="green"
              type="submit"
              variant="ghost"
              icon={<Icon as={FontAwesomeIcon} icon={['fal', 'plus']} />}
            />
          </Tooltip>
        </GridItem>
      </Grid>
    </Editable>
  );
};

export default CreateSubCategoryForm;
