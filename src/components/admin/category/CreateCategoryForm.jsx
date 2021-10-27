// packages
import { useState } from 'react';
import {
  Grid,
  Flex,
  GridItem,
  Editable,
  Badge,
  Heading,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  Tooltip,
  Icon,
  IconButton,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import EditableControls from '../sub/EditableControls';

// functions
import { createCategory } from '../../../lib/functions/category';

// helpers
import { toastError, toastSuccess } from '../../../lib/helpers/toastHandlers';

// action types
import ActionTypes from '../../../lib/enums/ActionTypes';

const CreateCategoryForm = ({ updateCategories }) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const { token: authtoken } = useSelector(state => state.user);
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
    dispatch({ type: ActionTypes.page_loading_on });
    try {
      const response = await createCategory({
        category: { name },
        authtoken,
      });
      dispatch({ type: ActionTypes.page_loading_off });
      updateCategories(categories => {
        return [response.data, ...categories];
      });
      toast(
        toastSuccess(
          'Category created',
          `You successfully created category: ${name}`
        )
      );
    } catch (err) {
      dispatch({ type: ActionTypes.page_loading_off });
      if (err.response.status === 400)
        toast(toastError(err.response.data.message));
    }
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
            New Category
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

export default CreateCategoryForm;
