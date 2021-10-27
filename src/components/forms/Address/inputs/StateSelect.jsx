import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Icon,
  Select,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from 'country-state-city';

const StateSelect = ({ countryCode, onChange, value }) => {
  const states = State.getStatesOfCountry(countryCode);

  function handleChange({ target: { name, value } }) {
    if (onChange) {
      onChange({ name, value });
    }
  }

  return (
    <FormControl id="state" isRequired={states?.length > 0}>
      <FormLabel>State</FormLabel>
      <InputGroup variant="filled">
        <InputLeftAddon as="label" htmlFor="state">
          <Icon as={FontAwesomeIcon} icon={['fas', 'flag-usa']} />
        </InputLeftAddon>
        <Select
          roundedLeft="none"
          name="state"
          value={value}
          placeholder="Please select a state"
          onChange={handleChange}
          disabled={states?.length < 1}
        >
          {states?.map(state => {
            return (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            );
          })}
        </Select>
      </InputGroup>
    </FormControl>
  );
};

export default StateSelect;
