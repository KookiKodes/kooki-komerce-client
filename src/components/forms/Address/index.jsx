import { Grid, GridItem, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

// components
import CountrySelect from './inputs/CountrySelect';
import NameInput from './inputs/NameInput';
import StreetInput from './inputs/StreetInput';
import OtherInput from './inputs/OtherInput';
import ZipCodeInput from './inputs/ZipCodeInput';
import StateSelect from './inputs/StateSelect';
import CitySelect from './inputs/CitySelect';

const AddressForm = ({ onSubmit, address, setAddress, loading }) => {
  const handleChange = ({ name, value }) =>
    setAddress(address => ({ ...address, [name]: value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(address);
    }
  };

  useEffect(() => {
    if (!loading) {
      setAddress(address => ({ ...address, state: '', city: '' }));
    }
  }, [address?.country, setAddress, loading]);

  useEffect(() => {
    if (!loading) {
      setAddress(address => ({ ...address, city: '' }));
    }
  }, [address?.state, setAddress, loading]);

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(5, 1fr)"
      as="form"
      gap={4}
      onSubmit={handleSubmit}
    >
      <GridItem colSpan={[6, 6, 6, 6, 3]} rowSpan={1}>
        <CountrySelect
          value={address?.country}
          onChange={handleChange}
          isDisabled={false}
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={[6, 6, 3, 6, 3]}>
        <NameInput
          value={address?.fullName}
          onChange={handleChange}
          isRequired
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={[6, 6, 3, 3, 3]}>
        <StreetInput
          value={address?.street}
          onChange={handleChange}
          isRequired
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={[6, 6, 3, 3, 3]}>
        <OtherInput value={address?.other} onChange={handleChange} />
      </GridItem>
      <GridItem rowSpan={1} colSpan={[6, 6, 3, 2, 2]}>
        <ZipCodeInput value={address?.zipCode} onChange={handleChange} />
      </GridItem>
      <GridItem rowSpan={1} colSpan={[6, 6, 3, 2, 2]}>
        <StateSelect
          countryCode={address?.country}
          value={address?.state}
          onChange={handleChange}
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={[6, 6, 3, 2, 2]}>
        <CitySelect
          value={address?.city}
          countryCode={address?.country}
          stateCode={address?.state}
          onChange={handleChange}
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={6}>
        <Button w="full" colorScheme="yellow" type="submit">
          Save Address
        </Button>
      </GridItem>
    </Grid>
  );
};

export default AddressForm;
