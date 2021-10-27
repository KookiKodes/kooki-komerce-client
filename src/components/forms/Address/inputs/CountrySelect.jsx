// packages
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Icon,
  Select,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Country } from 'country-state-city';

const countries = Country.getAllCountries();

const CountrySelect = ({ onChange, value, isDisabled }) => {
  function handleChange({ target: { name, value } }) {
    if (onChange) {
      onChange({ name, value });
    }
  }

  return (
    <FormControl id="country" isRequired={!isDisabled}>
      <FormLabel>Country</FormLabel>
      <InputGroup variant="filled">
        <InputLeftAddon as="label" htmlFor="country">
          <Icon as={FontAwesomeIcon} icon={['fas', 'globe']} />
        </InputLeftAddon>
        <Select
          fontWeight="bold"
          roundedLeft="none"
          name="country"
          autoFocus
          value={value}
          onChange={handleChange}
          placeholder="Select a country"
        >
          {countries.map(country => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </Select>
      </InputGroup>
    </FormControl>
  );
};

export default CountrySelect;
