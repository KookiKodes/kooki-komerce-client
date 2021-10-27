// packages
import { CheckboxGroup, Checkbox, Stack, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';

// enums
import Brand from '../../lib/enums/Brand';

const BrandCheckBoxes = ({ onSelect }) => {
  const [value, setValue] = useState([]);

  useCustomEventListener('clear-filter', async () => setValue([]));

  async function handleChange(value) {
    setValue(value);
    if (onSelect) {
      onSelect(value);
    }
  }

  return (
    <CheckboxGroup value={value} onChange={handleChange}>
      <Stack>
        {Brand.getKeys({ original: true }).map((key, index) => {
          return (
            <Checkbox
              colorScheme="yellow"
              value={Brand[Brand[key]]}
              key={index}
            >
              <Badge fontSize="md">{key}</Badge>
            </Checkbox>
          );
        })}
      </Stack>
    </CheckboxGroup>
  );
};

export default BrandCheckBoxes;
