import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  useToast,
  useBoolean,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailLink,
  updatePassword,
  getIdTokenResult,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// action types
import ActionTypes from '../../../lib/enums/ActionTypes';

// helpers
import { toastError } from '../../../lib/helpers/toastHandlers';
import { createOrUpdateUser } from '../../../lib/functions/auth';

const GuestRegisterComplete = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [invalid, setInvalid] = useBoolean(false);
  const borderColor = useColorModeValue('yellow.400', 'yellow.200');
  const toast = useToast();
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  useEffect(() => {
    const storedEmail = window.localStorage.getItem('emailForRegistration');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!password || !email)
      return toast(toastError('Email and password is required!'));

    if (!passwordRegex.test(password))
      return toast(toastError('Password must be at least 6 characters!'));

    if (password)
      try {
        const result = await signInWithEmailLink(
          getAuth(),
          email,
          window.location.href
        );

        if (result.user.emailVerified) {
          // remove user email from localStorage
          window.localStorage.removeItem('emailForRegistration');
          // get user id token
          const { user } = result;
          await updatePassword(user, password);
          const { token } = await getIdTokenResult(user);
          // redux store
          createOrUpdateUser(token)
            .then(res => {
              const { name, email, role, _id } = res.data;
              dispatch({
                type: ActionTypes.login,
                payload: {
                  name,
                  email,
                  role,
                  _id,
                  token,
                },
              });
            })
            .catch(err => console.log(err));
        }
      } catch (err) {
        toast(toastError(err.message));
      }
  };

  const handleChange = e => {
    const { value } = e.target,
      test = passwordRegex.test(value);

    setPassword(value);
    if (test && invalid) setInvalid.off();
    else if (!test && !invalid) setInvalid.on();
  };

  return (
    <Grid
      p={5}
      w="full"
      templateColumns="repeat(12, 1fr)"
      templateRows="repeat(1, 1fr)"
    >
      <GridItem w="full" colSpan={[12, 12, 6]} colStart={[1, 1, 4]}>
        <Heading py={5}>Register</Heading>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(1, 1fr)"
          gap={5}
          as="form"
          onSubmit={handleSubmit}
        >
          <GridItem>
            <FormControl isRequired id="email">
              <InputGroup>
                <Input
                  variant="flushed"
                  color="gray.500"
                  type="email"
                  placeholder="Email"
                  _focus={{
                    borderColor,
                  }}
                  value={email}
                  disabled
                />
                <InputRightElement>
                  <Icon
                    as={FontAwesomeIcon}
                    color="green.400"
                    icon={['fas', 'check']}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Email Invalid</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="password" isInvalid={invalid}>
              <InputGroup>
                <Input
                  variant="flushed"
                  type="password"
                  placeholder="Password"
                  _focus={{
                    borderColor,
                  }}
                  value={password}
                  onChange={handleChange}
                  autoFocus
                />
                <InputRightElement>
                  <Icon
                    as={FontAwesomeIcon}
                    color={invalid || !password ? 'red.400' : 'green.400'}
                    icon={
                      invalid || !password ? ['fas', 'times'] : ['fas', 'check']
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                Your password must be a minimum of 8 characters, contain at
                least one number, and contain at least one symbol.
              </FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <Button
              colorScheme="yellow"
              w="full"
              type="submit"
              isDisabled={invalid}
            >
              Complete Registration
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default GuestRegisterComplete;
