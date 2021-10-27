import { Checkbox, CheckboxGroup, Wrap, WrapItem, Tag } from '@chakra-ui/react';
import { useState } from 'react';
import { useCustomEventListener } from 'react-custom-events';

const SubCategoriesSelector = ({ subs, onSelect }) => {
  const [value, setValue] = useState([]);

  useCustomEventListener('clear-filter', async () => setValue([]));

  async function handleChange(value) {
    setValue(value);
    if (onSelect) {
      onSelect(value);
    }
  }

  return (
    <Wrap>
      <CheckboxGroup value={value} onChange={handleChange}>
        {subs?.map((sub, index) => {
          const isChecked = value.includes(sub?._id);
          return (
            <WrapItem key={index}>
              <Tag
                as="label"
                cursor="pointer"
                colorScheme={isChecked ? 'yellow' : 'gray'}
                _hover={{ shadow: 'outline' }}
                variant="solid"
                htmlFor={sub?._id}
                visibility="visible"
              >
                {sub.name}
              </Tag>
              <Checkbox
                display="none"
                id={sub?._id}
                key={index}
                value={sub?._id}
              />
            </WrapItem>
          );
        })}
      </CheckboxGroup>
    </Wrap>
  );
};

export default SubCategoriesSelector;
