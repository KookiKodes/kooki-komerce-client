// packages
import {
  HStack,
  IconButton,
  Icon,
  ScaleFade,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { round, range } from 'lodash';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCustomEventListener } from 'react-custom-events';

//hooks
import useRating from '../product/rating/hooks/useRating';

const RatingSelector = ({ maxStars, defaultValue, onSelect }) => {
  const stars = useRef(range(0, maxStars));
  const { rating, updateIndex, setSelected } = useRating({
    ratings: [],
    maxStars,
    selected: defaultValue - 1,
  });

  useCustomEventListener('clear-filter', data => setSelected(defaultValue - 1));

  const modalStarWidth = round((rating.index + 1) / maxStars, 1) * 100;

  const styles = useColorModeValue(
    {
      filledColor: 'yellow.400',
      color: 'gray.300',
    },
    {
      filledColor: 'yellow.400',
      color: 'yellow.800',
    }
  );

  function handleHover(index) {
    if (index >= rating.selected) {
      updateIndex(index);
    }
  }

  function handleSelectStar(star) {
    setSelected(star);
    if (onSelect) {
      onSelect([star + 1, star + 1.99]);
    }
  }

  return (
    <HStack align="center" justify="start" position="relative" spacing={0}>
      <HStack position="relative">
        {stars.current.map(star => {
          return (
            <IconButton
              key={star}
              color={styles.color}
              variant="ghost"
              position="relative"
              onMouseOver={() => handleHover(star)}
              onClick={() => handleSelectStar(star)}
              icon={
                <Icon as={FontAwesomeIcon} icon={['fas', 'star']} size="2x" />
              }
            />
          );
        })}
      </HStack>
      <HStack
        position="absolute"
        w={`calc(${modalStarWidth}% + 12px)`}
        overflow="hidden"
        py={2}
        pl={2}
        left={-2}
        pointerEvents="none"
      >
        {stars.current.map(star => {
          return (
            <ScaleFade
              key={star}
              in={star <= rating.index}
              initialScale={0}
              unmountOnExit
            >
              <Tooltip label={`${star + 1} ${star + 1 > 1 ? 'stars' : 'star'}`}>
                <IconButton
                  variant="unstyled"
                  color={styles.filledColor}
                  _hover={{ transform: 'scale(1.2)' }}
                  icon={
                    <Icon
                      size="2x"
                      as={FontAwesomeIcon}
                      icon={['fas', 'star']}
                    />
                  }
                />
              </Tooltip>
            </ScaleFade>
          );
        })}
      </HStack>
    </HStack>
  );
};

export default RatingSelector;
