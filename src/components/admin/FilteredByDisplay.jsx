import { Badge, Button, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FilteredByDisplay({ by, order, children, setBy, setOrder }) {
  function handleClick() {
    if (by !== children) setBy(children);
    else {
      if (order === 'asc') setOrder('dsc');
      else setOrder('asc');
    }
  }

  return (
    <Badge as={Button} colorScheme="blue" px={2} onClick={handleClick}>
      {children}
      {by === children && (
        <Icon
          as={FontAwesomeIcon}
          icon={order === 'dsc' ? ['fas', 'caret-up'] : ['fas', 'caret-down']}
          ml={2}
        />
      )}
    </Badge>
  );
}

export default FilteredByDisplay;
