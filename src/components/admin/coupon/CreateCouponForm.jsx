import {
  Editable,
  Grid,
  GridItem,
  Flex,
  EditableInput,
  EditablePreview,
  Heading,
  Spacer,
  ButtonGroup,
  Tooltip,
  IconButton,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputRightAddon,
  Icon,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import _ from 'lodash';

// components
import { SingleDatepicker } from '../../SingleDatePicker';
import EditableControls from '../sub/EditableControls';

// hooks
import useCoupon from '../../../lib/hooks/useCoupon';

// helpers
import { toastSuccess, toastError } from '../../../lib/helpers/toastHandlers';

// utils
const initialState = {
  expiration: new Date(),
  name: '',
  discount: 1,
};

const CreateCouponForm = ({ addCoupon, authtoken }) => {
  const [coupon, setCoupon] = useState(initialState);
  const { create } = useCoupon({ authtoken, needState: false });
  const toast = useToast();

  const styles = useColorModeValue(
    { bg: 'gray.50' },
    {
      bg: 'whiteAlpha.100',
    }
  );

  function handleChange(name, value) {
    setCoupon(coupon => ({ ...coupon, [name]: value }));
  }

  async function handleCreateCoupon(e) {
    e.preventDefault();
    try {
      const newCoupon = await create(coupon);
      if (addCoupon) addCoupon(newCoupon);
      setCoupon(initialState);
      toast(toastSuccess('Coupon Created', `Coupon was successfully created.`));
    } catch ({ message }) {
      console.log(message);
      toast(toastError(message));
    }
  }

  return (
    <Editable
      w="full"
      placeholder={`NAME`}
      fontWeight="bold"
      fontSize="xl"
      onChange={value => handleChange('name', _.toUpper(value))}
      value={coupon.name}
      position="relative"
    >
      <Grid
        as="form"
        w="full"
        py={4}
        px={2}
        size="lg"
        gap={4}
        templateColumns="repeat(5, 1fr)"
        onSubmit={handleCreateCoupon}
        bg={styles.bg}
      >
        <GridItem as={Flex} alignItems="center" colSpan={1} position="relative">
          <EditableInput
            display="flex"
            alignItems="center"
            justifyContent="center"
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
        <GridItem colSpan={1} px={2}>
          <SingleDatepicker
            date={coupon.expiration}
            onDateChange={value => handleChange('expiration', value)}
          />
        </GridItem>
        <GridItem colSpan={1} px={2}>
          <InputGroup variant="filled">
            <NumberInput
              name="discount"
              value={coupon.discount}
              id="discount"
              onChange={value => handleChange('discount', value)}
              min={1}
              max={100}
              allowMouseWheel
            >
              <NumberInputField roundedRight="none" />
            </NumberInput>
            <InputRightAddon as="label" htmlFor="discount">
              <Icon as={FontAwesomeIcon} icon={['fal', 'percent']} />
            </InputRightAddon>
          </InputGroup>
        </GridItem>
        <GridItem colSpan={1}>
          <Spacer />
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

export default CreateCouponForm;
