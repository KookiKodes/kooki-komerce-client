// packages
import { useRef } from 'react';
import {
  Flex,
  Grid,
  GridItem,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  FormErrorMessage,
  Icon,
  Spinner,
  useBoolean,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { getAuth, updatePassword } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// helpers
import { toastSuccess, toastError } from '../../lib/helpers/toastHandlers';

// action types
import ActionTypes from '../../lib/enums/ActionTypes';

const PasswordUpdateForm = () => {
  const password = useRef({ value: '', invalid: false });
  const [invalid, setInvalid] = useBoolean();
  const { loading } = useSelector(state => state.page);
  const dispatch = useDispatch();
  const borderColor = useColorModeValue('yellow.400', 'yellow.200');
  const toast = useToast();
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  function handleChange(e) {
    const { value } = e.target,
      test = passwordRegex.test(value);
    password.current.value = value;

    if (test) setInvalid.off();
    else setInvalid.on();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    if (!password.current.value || !passwordRegex.test(password.current.value))
      return toast(toastError('Your password does not meet the requirements'));
    dispatch({ type: ActionTypes.page_loading_on });

    try {
      await updatePassword(getAuth().currentUser, password.current.value);
      password.current.value = '';
      dispatch({ type: ActionTypes.page_loading_off });
      toast(
        toastSuccess(
          'Updated Password',
          'Your password was successfully updated.'
        )
      );
    } catch (err) {
      dispatch({ type: ActionTypes.page_loading_off });
      toast(toastError(err.message));
    }
  }

  return (
    <Grid
      as="form"
      flexDir="column"
      onSubmit={handleSubmit}
      templateColumns="repeat(12, 1fr)"
      templateRows="repeat(2, 1fr)"
      w="full"
      gap={6}
    >
      <GridItem colSpan={6} rowSpan={1} colStart={4}>
        <FormControl w="full" isInvalid={invalid} isRequired>
          <InputGroup>
            <Input
              variant="flushed"
              type="password"
              onChange={handleChange}
              placeholder="Enter a new password"
              disabled={loading}
              _focus={{ borderColor }}
            />
            <InputRightElement>
              <Icon
                as={FontAwesomeIcon}
                color={
                  invalid || !password.current.value ? 'red.400' : 'green.400'
                }
                icon={
                  invalid || !password.current.value
                    ? ['fas', 'times']
                    : ['fas', 'check']
                }
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            Your password must contain a minimum of 8 characters, a special
            character and a number
          </FormErrorMessage>
        </FormControl>
      </GridItem>
      <GridItem colSpan={6} rowSpan={1} colStart={4} rowStart={2}>
        <Button
          type="submit"
          w="full"
          colorScheme="yellow"
          disabled={invalid || loading || !password.current.value}
        >
          Change Password
        </Button>
      </GridItem>
    </Grid>
  );
};

const UserPassword = () => {
  const { loading } = useSelector(state => state.page);

  return (
    <Flex w="full" h="full" alignItems="center" justifyContent="center" p={6}>
      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="repeat(2, min-content)"
        w="full"
        h="min-content"
        gap={10}
      >
        <GridItem
          as={Flex}
          alignItems="center"
          justifyContent="center"
          rowSpan={1}
          colSpan={12}
          rowStart={1}
          rowEnd={1}
        >
          <Heading>{loading ? 'Loading' : 'Update Password'}</Heading>
          {loading && <Spinner size="lg" />}
        </GridItem>
        <GridItem
          as={Flex}
          display="flex"
          alignItems="center"
          justifyContent="center"
          rowSpan={1}
          colSpan={12}
          rowStart={2}
          rowEnd={2}
        >
          <PasswordUpdateForm />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default UserPassword;
