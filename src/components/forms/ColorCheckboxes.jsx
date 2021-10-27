import { CheckboxGroup, Checkbox, Stack, Tag } from '@chakra-ui/react';
import { useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';

// enums
import Color from '../../lib/enums/Color';

const ColorCheckboxes = ({ onSelect }) => {
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
        {Color.getKeys({ original: true }).map((key, index) => {
          return (
            <Checkbox
              colorScheme="yellow"
              value={Color[Color[key]]}
              key={index}
            >
              <Tag fontSize="lg">{key}</Tag>
            </Checkbox>
          );
        })}
      </Stack>
    </CheckboxGroup>
  );
};

export default ColorCheckboxes;
