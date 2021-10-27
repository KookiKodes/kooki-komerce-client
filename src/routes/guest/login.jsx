import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Icon,
  Spinner,
  useToast,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRef } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  getIdTokenResult,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// enums
import ActionTypes from '../../lib/enums/ActionTypes';

// helpers
import { createOrUpdateUser } from '../../lib/functions/auth';
import { toastError } from '../../lib/helpers/toastHandlers';

const GuestLogin = () => {
  const email = useRef({ value: '', invalid: false });
  const password = useRef({ value: '', invalid: false });
  const [invalid, setInvalid] = useBoolean();
  const borderColor = useColorModeValue('yellow.400', 'yellow.200');
  const toast = useToast();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.page);
  const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch({ type: ActionTypes.page_loading_on });
    if (!email.current.value)
      return toast(toastError('Please provide an email!'));
    if (!emailRegex.test(email.current.value))
      return toast(toastError('Please provide a valid email!'));
    if (!password.current.value)
      return toast(toastError('Please provide an password!'));
    if (!passwordRegex.test(password.current.value))
      return toast(toastError('Please provide a valid password!'));

    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email.current.value,
        password.current.value
      );
      const { token } = await getIdTokenResult(user);

      // send authtoken to api
      createOrUpdateUser(token)
        .then(async res => {
          const { name, email, role, _id } = res.data;
          dispatch({ type: ActionTypes.page_loading_off });
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
        .catch(err => {
          console.log(err.message);
          dispatch({ type: ActionTypes.page_loading_off });
        });
    } catch (err) {
      dispatch({ type: ActionTypes.page_loading_off });
      toast(toastError(err.message));
    }
  };

  const handleChange = e => {
    const { value, type } = e.target;

    let test = true;

    switch (type) {
      case 'email':
        test = emailRegex.test(value);
        email.current = { value, invalid: !test };
        break;
      case 'password':
        test = passwordRegex.test(value);
        password.current = { value, invalid: !test };
        break;
      default:
        break;
    }

    if (test && !password.current.invalid && !email.current.invalid)
      setInvalid.off();
    else if (!test) setInvalid.on();
  };

  const googleLogin = async e => {
    e.preventDefault();
    dispatch({ type: ActionTypes.page_loading_on });

    try {
      const { user } = await signInWithPopup(
        getAuth(),
        new GoogleAuthProvider()
      );
      const { token } = await getIdTokenResult(user);

      createOrUpdateUser(token)
        .then(res => {
          const { name, email, role, _id } = res.data;
          dispatch({ type: ActionTypes.page_loading_off });
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
        .catch(err => {
          dispatch({ type: ActionTypes.page_loading_off });
          console.log(err);
        });
    } catch (err) {
      dispatch({ type: ActionTypes.page_loading_off });
      toast(toastError(err.message));
    }
  };

  return (
    <Grid
      p={5}
      w="full"
      templateColumns="repeat(12, 1fr)"
      templateRows="repeat(1, 1fr)"
    >
      <GridItem w="full" colSpan={[12, 12, 6]} colStart={[1, 1, 4]}>
        <Heading py={5}>
          {!loading ? 'Login' : 'Loading'}
          {loading && (
            <Spinner size="md" thickness={2} color={borderColor} ml={2} />
          )}
        </Heading>
        <Grid
          templateRows="repeat(4, min-content)"
          templateColumns="repeat(1, 1fr)"
          gap={5}
          as="form"
          onSubmit={handleSubmit}
        >
          <GridItem rowSpan={1}>
            <FormControl
              isRequired
              id="email"
              isInvalid={email.current.invalid}
            >
              <Input
                variant="flushed"
                type="email"
                placeholder="Your email"
                _focus={{
                  borderColor,
                }}
                onChange={handleChange}
                autoFocus
              />
              <FormErrorMessage>Email is invalid!</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem rowSpan={1}>
            <FormControl
              isRequired
              id="password"
              isInvalid={password.current.invalid}
            >
              <Input
                variant="flushed"
                type="password"
                placeholder="Your password"
                _focus={{
                  borderColor,
                }}
                onChange={handleChange}
              />
              <FormHelperText
                as={Link}
                h="full"
                color="blue.400"
                to="/guest/login/forgot-password"
                _hover={{ textDecoration: 'underline', color: 'blue.200' }}
              >
                Forgot password?
              </FormHelperText>
              <FormErrorMessage>Password is invalid!</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem rowSpan={1}>
            <Button
              w="full"
              colorScheme="yellow"
              type="submit"
              isDisabled={
                invalid ||
                loading ||
                !password.current.value ||
                !email.current.value
              }
              leftIcon={
                <Icon as={FontAwesomeIcon} icon={['fas', 'envelope']} />
              }
            >
              Login with Email/Password
            </Button>
          </GridItem>
          <GridItem rowSpan={1}>
            <Button
              onClick={googleLogin}
              w="full"
              colorScheme="red"
              type="submit"
              isDisabled={invalid || loading}
              leftIcon={<Icon as={FontAwesomeIcon} icon={['fab', 'google']} />}
            >
              Login with Google
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default GuestLogin;
