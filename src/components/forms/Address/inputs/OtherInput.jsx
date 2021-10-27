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

const OtherInput = ({ onChange, value, isRequired }) => {
  function handleChange({ target: { name, value } }) {
    if (onChange) {
      onChange({ name, value });
    }
  }

  return (
    <FormControl id="other" isRequired={isRequired}>
      <FormLabel>Apt/Suite/Other</FormLabel>
      <InputGroup variant="filled">
        <InputLeftElement as="label" htmlFor="other">
          <Icon as={FontAwesomeIcon} icon={['fas', 'building']} />
        </InputLeftElement>
        <Input name="other" value={value} onChange={handleChange} />
      </InputGroup>
    </FormControl>
  );
};

export default OtherInput;
