import { RadioGroup, Radio, Stack, Tag } from '@chakra-ui/react';
import { useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';

const ShippingCheckBoxes = ({ onSelect }) => {
  const [value, setValue] = useState('');

  useCustomEventListener('clear-filter', async () => setValue(''));

  async function handleChange(value) {
    setValue(value);
    if (onSelect) {
      onSelect(value);
    }
  }

  return (
    <RadioGroup value={value} onChange={handleChange}>
      <Stack>
        {['Yes', 'No'].map((option, index) => {
          return (
            <Radio
              cursor="pointer"
              colorScheme="yellow"
              value={option}
              key={index}
            >
              <Tag fontSize="lg" cursor="pointer">
                {option}
              </Tag>
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default ShippingCheckBoxes;
