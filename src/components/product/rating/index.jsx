// packages
import {
  Icon,
  IconButton,
  Center,
  Heading,
  HStack,
  Text,
  Box,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ScaleFade,
  ModalFooter,
  Button,
  ButtonGroup,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { range, round } from 'lodash';

//hooks
import useRating from './hooks/useRating';

const RatingDisplay = ({
  maxStars,
  ratings,
  onOpen,
  onClose,
  isOpen,
  onRate,
  defaultValue = 1,
  children,
}) => {
  const { rating, updateIndex, setSelected } = useRating({
    ratings,
    maxStars,
    selected: defaultValue - 1,
  });
  const stars = useRef(range(0, maxStars));
  const width = round(rating.average / maxStars, 2) * 100;
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

  function handleClose() {
    if (onClose) onClose();
    updateIndex(0);
    setSelected(0);
  }

  function handleHover(index) {
    if (index >= rating.selected) {
      updateIndex(index);
    }
  }

  function handleSelectStar(star) {
    setSelected(star);
  }

  function confirmRating() {
    if (onRate) onRate(rating.selected + 1);
    if (onClose) onClose();
  }

  return (
    <>
      {ratings?.length > 0 && (
        <Tooltip
          label={
            rating.average
              ? `Average rating: ${rating.average} stars`
              : 'No ratings yet'
          }
          aria-label={
            rating.average
              ? `Average rating: ${rating.average} stars`
              : 'No ratings yet'
          }
        >
          <HStack
            align="center"
            justify="start"
            position="relative"
            spacing={0}
            w="min-content"
          >
            <HStack position="relative">
              {stars.current.map(star => {
                return (
                  <Box key={star}>
                    <Icon
                      as={FontAwesomeIcon}
                      color={styles.color}
                      icon={['fas', 'star']}
                    />
                  </Box>
                );
              })}
              <Text position="absolute" fontSize="sm" right="-20%">
                ({ratings.length})
              </Text>
            </HStack>
            <HStack position="absolute" overflow="hidden" w={`${width}%`}>
              {stars.current.map(star => {
                return (
                  <Box w="min-content" key={star}>
                    <Icon
                      as={FontAwesomeIcon}
                      color={styles.filledColor}
                      icon={['fas', 'star']}
                    />
                  </Box>
                );
              })}
            </HStack>
          </HStack>
        </Tooltip>
      )}
      {!rating.average && (
        <HStack align="center" justify="center">
          <Text w="full">No ratings yet</Text>
        </HStack>
      )}
      {onClose && (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered useInert isLazy>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">{children}</Heading>
              <ModalCloseButton />
              <Divider py={2} />
            </ModalHeader>
            <ModalBody>
              <Center>
                <HStack
                  align="center"
                  justify="start"
                  position="relative"
                  spacing={0}
                >
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
                            <Icon
                              as={FontAwesomeIcon}
                              icon={['fas', 'star']}
                              size="2x"
                            />
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
                          <Tooltip
                            label={`${star + 1} ${
                              star + 1 > 1 ? 'stars' : 'star'
                            }`}
                          >
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
              </Center>
              <Divider py={2} />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button colorScheme="red" onClick={handleClose}>
                  Cancel
                </Button>
                <Button colorScheme="green" onClick={confirmRating}>
                  Confirm
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default RatingDisplay;
