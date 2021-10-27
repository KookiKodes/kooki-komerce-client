// packages
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Stack,
  Tag,
  Tooltip,
} from '@chakra-ui/react';
import { format } from 'currency-formatter';
import { useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';

const PriceRangeSlider = ({
  onChange,
  min = 10,
  max = 100,
  defaultValue = [10, 100],
  step,
}) => {
  const [value, setValue] = useState(defaultValue);

  useCustomEventListener('clear-filter', async () => {
    setValue(defaultValue);
  });

  async function handleChange(value) {
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <Stack spacing={4} pt={2}>
      <RangeSlider
        colorScheme="green"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        name="price"
        aria-label={JSON.stringify(['min', 'max'])}
        value={value}
        onChange={value => setValue(value)}
        onChangeEnd={handleChange}
        size="lg"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip label={`${format(value[0], { code: 'USD' })}`}>
          <RangeSliderThumb index={0} bg="green.700" />
        </Tooltip>
        <Tooltip label={`${format(value[1], { code: 'USD' })}`}>
          <RangeSliderThumb index={1} bg="green.700" />
        </Tooltip>
      </RangeSlider>
      <Stack direction="row" justify="space-between">
        <Tag colorScheme="green">{format(value[0], { code: 'USD' })}</Tag>
        <Tag colorScheme="green">{format(value[1], { code: 'USD' })}</Tag>
      </Stack>
    </Stack>
  );
};

export default PriceRangeSlider;
