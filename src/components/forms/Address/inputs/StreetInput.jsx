import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StreetInput = ({ value, onChange, isRequired }) => {
  function handleChange({ target: { name, value } }) {
    if (onChange) {
      onChange({ name, value });
    }
  }

  return (
    <FormControl id="street" isRequired={isRequired}>
      <FormLabel>Street</FormLabel>
      <InputGroup variant="filled">
        <InputLeftElement as="label" htmlFor="street">
          <Icon as={FontAwesomeIcon} icon={['fas', 'road']} />
        </InputLeftElement>
        <Input
          placeholder="Enter your street"
          name="street"
          value={value}
          onChange={handleChange}
        />
      </InputGroup>
    </FormControl>
  );
};

export default StreetInput;
