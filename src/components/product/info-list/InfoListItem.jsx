import { Flex, Text } from '@chakra-ui/react';

const InfoListItem = ({ title, children }) => {
  return (
    <Flex flex="auto" justifyContent="space-between">
      <Text>{title}</Text>
      {children}
    </Flex>
  );
};

export default InfoListItem;
