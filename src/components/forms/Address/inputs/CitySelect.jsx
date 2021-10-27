import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Icon,
  Select,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { City } from 'country-state-city';

const CitySelect = ({ countryCode, stateCode, onChange, value }) => {
  const cities = City.getCitiesOfState(countryCode, stateCode);

  function handleChange({ target: { name, value } }) {
    if (onChange) {
      onChange({ name, value });
    }
  }

  return (
    <FormControl id="city" isRequired={cities?.length > 0}>
      <FormLabel>City</FormLabel>
      <InputGroup variant="filled">
        <InputLeftAddon as="label" htmlFor="city">
          <Icon as={FontAwesomeIcon} icon={['fas', 'city']} />
        </InputLeftAddon>
        <Select
          roundedLeft="none"
          onChange={handleChange}
          disabled={cities?.length < 1}
          placeholder="Please select a city"
          name="city"
          value={value}
        >
          {cities?.map((city, index) => {
            return (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            );
          })}
        </Select>
      </InputGroup>
    </FormControl>
  );
};

export default CitySelect;
