import {
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Icon,
  useColorModeValue,
  useToast,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// helpers
import { toastSuccess, toastError } from '../../lib/helpers/toastHandlers';

const GuestRegister = () => {
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useBoolean(false);
  const borderColor = useColorModeValue('yellow.400', 'yellow.200');
  const toast = useToast();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async e => {
    if (!email) return toast(toastError('Please provide an email!'));
    if (!emailRegex.test(email))
      return toast(toastError('Please provide a valid email!'));

    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(getAuth(), email, config);
      toast(
        toastSuccess(
          'Email sent.',
          `We've sent an link to ${email}. Click the link to finish your registration.`
        )
      );

      window.localStorage.setItem('emailForRegistration', email);
      setEmail('');
    } catch (err) {
      toast(toastError(err));
    }
  };

  const handleChange = e => {
    const { value } = e.target,
      test = emailRegex.test(value);
    setEmail(value);
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
            <FormControl isRequired id="email" isInvalid={invalid}>
              <InputGroup>
                <Input
                  variant="flushed"
                  type="email"
                  placeholder="Email"
                  _focus={{
                    borderColor,
                  }}
                  value={email}
                  onChange={handleChange}
                  autoFocus
                />
                <InputRightElement>
                  <Icon
                    as={FontAwesomeIcon}
                    color={invalid || !email ? 'red.400' : 'green.400'}
                    icon={
                      invalid || !email ? ['fas', 'times'] : ['fas', 'check']
                    }
                  />
                </InputRightElement>
              </InputGroup>
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
              Register
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default GuestRegister;
