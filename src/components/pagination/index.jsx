// packages
import { Heading, Icon, IconButton, ButtonGroup } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { range } from 'lodash';
import { useEffect, useRef } from 'react';

// hooks
import usePage from './hooks/usePage';

const Pagination = ({ pageCount = 1, onChange }) => {
  const [page, { increment, decrement, select, update }] = usePage({
    min: 1,
    max: pageCount,
    defaultValue: 1,
  });
  const prevPageCount = useRef(pageCount - 1);
  const pages = range(1, pageCount + 1);

  useEffect(() => {
    if (Math.abs(prevPageCount.current - pageCount)) {
      update({ max: pageCount });
      onChange(page);
      prevPageCount.current = pageCount;
    }
  }, [pageCount, page, onChange, update]);

  useEffect(() => {
    onChange(page);
  }, [onChange, page]);

  return (
    <ButtonGroup variant="ghost">
      <IconButton
        onClick={decrement}
        icon={<Icon as={FontAwesomeIcon} icon={['fal', 'chevron-left']} />}
      />
      {pages.map(num => {
        const selected = num === page;
        return (
          <IconButton
            key={num}
            onClick={() => select(num)}
            colorScheme={selected ? 'yellow' : 'gray'}
            variant={selected ? 'solid' : 'ghost'}
            icon={<Heading size="md">{num}</Heading>}
          />
        );
      })}
      <IconButton
        onClick={increment}
        icon={<Icon as={FontAwesomeIcon} icon={['fal', 'chevron-right']} />}
      />
    </ButtonGroup>
  );
};

export default Pagination;
