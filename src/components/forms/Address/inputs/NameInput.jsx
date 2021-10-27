import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NameInput = ({ onChange, isRequired, value }) => {
  function handleChange({ target: { name, value } }) {
    if (onChange) {
      onChange({ name, value });
    }
  }
  return (
    <FormControl id="fullName" isRequired={isRequired}>
      <FormLabel>Full name</FormLabel>
      <InputGroup variant="filled">
        <InputLeftElement as="label" htmlFor="fullName">
          <Icon as={FontAwesomeIcon} icon={['fas', 'user']} />
        </InputLeftElement>
        <Input
          placeholder="Enter your full name"
          name="fullName"
          value={value}
          onChange={handleChange}
        />
      </InputGroup>
    </FormControl>
  );
};

export default NameInput;
