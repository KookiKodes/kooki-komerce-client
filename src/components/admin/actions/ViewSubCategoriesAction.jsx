import {
  Tooltip,
  Box,
  IconButton,
  AccordionButton,
  AccordionIcon,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewSubCategoriesAction = ({ isDisabled }) => {
  return (
    <Tooltip label="Show sub-categories">
      <Box display="inline-block">
        <AccordionButton
          as={IconButton}
          disabled={isDisabled}
          variant="ghost"
          w="auto"
          p={0}
          colorScheme="gray"
        >
          <AccordionIcon as={FontAwesomeIcon} icon={['fal', 'chevron-down']} />
        </AccordionButton>
      </Box>
    </Tooltip>
  );
};

export default ViewSubCategoriesAction;
