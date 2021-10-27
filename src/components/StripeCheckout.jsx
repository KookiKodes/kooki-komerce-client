import {
  Box,
  Button,
  Center,
  Link as CLink,
  Text,
  Spinner,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// functions
import { createPaymentIntent } from '../lib/functions/stripe';
import { createOrder } from '../lib/functions/user';

const cartStyle = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeCheckout = ({ onSubmit }) => {
  const user = useSelector(state => state.user);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const getPaymentIntent = useCallback(async () => {
    const {
      data: { clientSecret },
    } = await createPaymentIntent({ authtoken: user.token });
    setClientSecret(clientSecret);
  }, [user.token]);

  useEffect(() => {
    getPaymentIntent();
  }, [getPaymentIntent]);

  async function handleSubmit(e) {
    console.log('submit');
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
    } else {
      setError(null);
      setSucceeded(true);
      const response = await createOrder({
        authtoken: user.token,
        stripeResponse: payload,
      });

      if (onSubmit && response.data.success) onSubmit(response.data.order);
    }
    setProcessing(false);
  }

  function handleChange(e) {
    // listen for changes in the card element and display any errors as the customer types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : '');
  }

  return (
    <>
      {succeeded && (
        <Center>
          <Text fontSize="xl">
            Payment successful!{' '}
            <CLink as={Link} to="/user/history" color="purple.500">
              See in purchase history.
            </CLink>
          </Text>
        </Center>
      )}
      <Stack
        as="form"
        id="payment-form"
        px={8}
        py={10}
        borderWidth="2px"
        rounded="md"
        onSubmit={handleSubmit}
      >
        <Box>
          <CardElement
            id="card-element"
            options={cartStyle}
            onChange={handleChange}
          />
          <Button
            w="full"
            roundedTop="none"
            py={6}
            colorScheme="yellow"
            type="submit"
            disabled={processing || disabled || succeeded}
          >
            {processing && <Spinner size="xl" />}
            {!processing && <Text>Pay</Text>}
          </Button>
        </Box>
        <Spacer />
        {error && (
          <Center className="card-error" role="alert">
            <Text fontSize="lg">{error}</Text>
          </Center>
        )}
      </Stack>
    </>
  );
};

export default StripeCheckout;
