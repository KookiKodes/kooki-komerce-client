// packages
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ZipCodeInput = ({ onChange, value, isRequired }) => {
  function handleChange({ target: { name, value } }) {
    if (onChange) {
      onChange({ name, value: parseInt(value) || '' });
    }
  }

  return (
    <FormControl id="zipCode" isRequired={isRequired}>
      <FormLabel>Zip code</FormLabel>
      <InputGroup variant="filled">
        <InputLeftElement as="label" htmlFor="zipCode">
          <Icon as={FontAwesomeIcon} icon={['fas', 'mail-bulk']} />
        </InputLeftElement>
        <Input
          name="zipCode"
          type="number"
          value={value}
          onChange={handleChange}
        />
      </InputGroup>
    </FormControl>
  );
};

export default ZipCodeInput;
