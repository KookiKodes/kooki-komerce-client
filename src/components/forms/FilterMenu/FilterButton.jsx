import { AccordionButton, AccordionIcon, HStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterButton = ({ children, onClick }) => {
  function handleClick(e) {
    if (onClick) onClick(e);
  }
  return (
    <AccordionButton
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onClick={handleClick}
    >
      <HStack spacing={2}>{children}</HStack>
      <AccordionIcon as={FontAwesomeIcon} icon={['fal', 'chevron-down']} />
    </AccordionButton>
  );
};

export default FilterButton;
