import { AccordionItem } from '@chakra-ui/react';

const FilterItem = ({ children }) => {
  return <AccordionItem px={6}>{children}</AccordionItem>;
};

export default FilterItem;
