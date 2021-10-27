import { useColorModeValue, Tag, Text } from '@chakra-ui/react';
import { escapeRegExp } from 'lodash';

const Highlighted = ({ text = '', highlight = '' }) => {
  const colorScheme = useColorModeValue('blackAlpha', 'gray');
  if (!highlight.trim()) {
    return (
      <Text size="lg" px={2} isTruncated>
        {text}
      </Text>
    );
  }
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);
  return (
    <Text
      size="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      colorScheme={colorScheme}
      isTruncated
    >
      {parts
        .filter(part => part)
        .map((part, i) =>
          regex.test(part) ? (
            <Tag
              as="span"
              display="flex"
              key={i}
              colorScheme="yellow"
              size="lg"
              minW="min-content"
              px={0.25}
            >
              {part}
            </Tag>
          ) : (
            <Text
              as="span"
              display="inline-block"
              justifyContent="center"
              key={i}
              size="lg"
            >
              {part}
            </Text>
          )
        )}
    </Text>
  );
};

export default Highlighted;
