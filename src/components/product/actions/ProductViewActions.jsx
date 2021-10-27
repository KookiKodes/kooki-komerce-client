import {
  ButtonGroup,
  HStack,
  Button,
  StackDivider,
  Stack,
  Icon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// hooks
import useWishlist from '../../../lib/hooks/useWishlist';

const ProductActions = ({
  onAddClick,
  onWishClick,
  onRateClick,
  onRemoveClick,
  userLoggedIn = false,
  userRated = false,
  exists,
  disableAddToCart,
  title,
  context,
}) => {
  const user = useSelector(state => state.user);
  const wishlist = useWishlist({
    authtoken: user.token,
    needsState: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const tooltip = exists
    ? `Remove ${title} from cart.`
    : `Add ${title} to cart.`;

  function handleAddClick() {
    if (onAddClick) onAddClick();
  }

  function handleRemoveClick() {
    if (onRemoveClick) onRemoveClick();
  }

  function handleWishClick() {
    if (wishlist.wishlisted) {
      wishlist.remove(context._id);
    } else {
      wishlist.add(context._id);
    }
    if (onWishClick) onWishClick();
  }

  function handleRateClick() {
    if (onRateClick && userLoggedIn) onRateClick();
    if (!userLoggedIn) {
      navigate('/guest/login', { state: location });
    }
  }

  useEffect(() => {
    if (context._id && wishlist.wishlisted === null) {
      wishlist.isWishlisted(context._id);
    }
  }, [wishlist, context]);

  return (
    <ButtonGroup
      as={HStack}
      w="full"
      align="center"
      justify="center"
      variant="ghost"
      divider={<StackDivider />}
      isAttached
    >
      {!exists && (
        <Tooltip label={tooltip} aria-label={tooltip}>
          <Button
            py={10}
            flex="auto"
            w="full"
            colorScheme="green"
            rounded="none"
            onClick={handleAddClick}
            disabled={disableAddToCart}
          >
            <Stack align="center">
              <Icon as={FontAwesomeIcon} icon={['fal', 'cart-plus']} />
              <Text>{!disableAddToCart && 'Add To Cart'}</Text>
              <Text>{disableAddToCart && 'Out Of Stock'}</Text>
            </Stack>
          </Button>
        </Tooltip>
      )}
      {exists && (
        <Tooltip label={tooltip} aria-label={tooltip}>
          <Button
            py={10}
            flex="auto"
            w="full"
            colorScheme="red"
            rounded="none"
            onClick={handleRemoveClick}
            disabled={disableAddToCart}
          >
            <Stack align="center">
              <Icon as={FontAwesomeIcon} icon={['fas', 'shopping-cart']} />
              <Text fontSize="smaller">Remove from cart</Text>
            </Stack>
          </Button>
        </Tooltip>
      )}
      <Button
        py={10}
        flex="auto"
        w="full"
        colorScheme="blue"
        onClick={handleWishClick}
      >
        <Stack align="center">
          <Icon
            as={FontAwesomeIcon}
            icon={wishlist.wishlisted ? ['fas', 'heart'] : ['fal', 'heart']}
          />
          {userLoggedIn && wishlist.wishlisted && (
            <Text fontSize="xs">Remove from wishlist</Text>
          )}
          {userLoggedIn && !wishlist.wishlisted && (
            <Text fontSize="smaller">Add to wishlist</Text>
          )}
          {!userLoggedIn && (
            <Text fontSize="x-small">Login to add to wishlist</Text>
          )}
        </Stack>
      </Button>
      <Button
        py={10}
        flex="auto"
        w="full"
        colorScheme="red"
        rounded="none"
        onClick={handleRateClick}
      >
        <Stack align="center">
          <Icon
            as={FontAwesomeIcon}
            icon={userRated ? ['fas', 'star'] : ['fal', 'star']}
          />
          {userLoggedIn && userRated && (
            <Text fontSize="smaller">Update rating</Text>
          )}
          {userLoggedIn && !userRated && (
            <Text fontSize="smaller">Leave rating</Text>
          )}
          {!userLoggedIn && (
            <Text fontSize="x-small">Login to leave rating</Text>
          )}
        </Stack>
      </Button>
    </ButtonGroup>
  );
};

export default ProductActions;
