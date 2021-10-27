import { Checkbox, CheckboxGroup, Stack, Fade } from '@chakra-ui/react';
import { useCustomEventListener } from 'react-custom-events';
import { useState } from 'react';

const CategoriesCheckboxes = ({ categories, isVisible, onCheck }) => {
  const [value, setValue] = useState([]);

  useCustomEventListener('clear-filter', async () => setValue([]));

  async function handleCheck(value) {
    if (onCheck) {
      setValue(value);
      onCheck(value);
    }
  }

  return (
    <Stack>
      <CheckboxGroup onChange={handleCheck} value={value}>
        {categories.map((category, index) => {
          return (
            <Fade key={index} in={isVisible}>
              <Checkbox colorScheme="yellow" key={index} value={category?._id}>
                {category.name}
              </Checkbox>
            </Fade>
          );
        })}
      </CheckboxGroup>
    </Stack>
  );
};

export default CategoriesCheckboxes;
