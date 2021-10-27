import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Spinner,
  useToast,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// helpers
import { toastError, toastSuccess } from '../../../lib/helpers/toastHandlers';

const GuestForgotPassword = () => {
  const email = useRef({ value: '', invalid: false });
  const borderColor = useColorModeValue('yellow.400', 'yellow.200');
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [loading, setLoading] = useBoolean();
  const [invalid, setInvalid] = useBoolean();
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading.on();

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await sendPasswordResetEmail(getAuth(), email.current.value, config);
      email.current = { value: '', invalid: false };
      setInvalid.off();
      toast(
        toastSuccess(
          'Email sent.',
          'Please check your email for the password reset link!'
        )
      );
    } catch (err) {
      toast(toastError(err.message));
    }
    setLoading.off();
  };

  const handleChange = e => {
    const { value } = e.target,
      test = emailRegex.test(value);
    email.current = { value, invalid: !test };
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
        <Heading py={5}>
          {!loading ? 'Forgot Password' : 'Loading'}
          {loading && (
            <Spinner size="md" thickness={2} color={borderColor} ml={2} />
          )}
        </Heading>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(1, 1fr)"
          gap={5}
          as="form"
          onSubmit={handleSubmit}
        >
          <GridItem>
            <FormControl
              isRequired
              id="email"
              isInvalid={email.current.invalid}
            >
              <Input
                variant="flushed"
                type="email"
                placeholder="Email"
                _focus={{
                  borderColor,
                }}
                onChange={handleChange}
                autoFocus
              />
              <FormErrorMessage>Email Invalid</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem>
            <Button
              colorScheme="yellow"
              w="full"
              type="submit"
              isDisabled={invalid}
            >
              Submit
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default GuestForgotPassword;
