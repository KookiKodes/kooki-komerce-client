// packages
import {
  Text,
  Icon,
  IconButton,
  Box,
  Menu,
  MenuItemOption,
  MenuOptionGroup,
  MenuButton,
  Button,
  MenuList,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { format } from 'currency-formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import _ from 'lodash';
import pipe from 'pipe-functions';

// components
import CartTableRow from './CartTableRow';
import CartRowData from './CartRowData';
import ModalImage from 'react-modal-image';

// enums
import Brand from '../../lib/enums/Brand';

// static
import Laptop from '../product/images/laptop.png';

const findKey = keyToFind => key =>
  key.toUpperCase() === keyToFind.toUpperCase();
const find = fn => value => _.find(value, fn);
const findDef = (color, colors) => pipe(colors, find(findKey(color)));

const CartRow = ({
  onRemove,
  onChangeCount,
  onColorChange,
  styles,
  item,
  colors,
}) => {
  const defColor = findDef(item.color, colors);
  const [color, setColor] = useState(defColor);
  const [count, setCount] = useState(item.count);
  const price = format(item.price, { code: 'USD' });
  const brand = Brand.getKeys({ original: true }).find(
    key => key.toUpperCase() === item.brand
  );
  const shipping = item.shipping.toLowerCase() === 'yes';

  function handleRemove() {
    if (onRemove) {
      onRemove(item);
    }
  }

  function handleChangeCount(count) {
    setCount(count);
    if (onChangeCount && count > 0 && item.quantity >= count) {
      onChangeCount({ item, count });
    }
  }

  function handleColorChange(color) {
    setColor(color);
    if (onColorChange) {
      onColorChange({ item, color });
    }
  }

  return (
    <CartTableRow>
      <CartRowData styles={styles}>
        {item.images.length && (
          <Box maxW={100} objectFit="cover">
            <ModalImage
              alt={item?.title}
              small={item.images[0]?.url}
              large={item.images[0]?.url}
            />
          </Box>
        )}
        {!item.images.length && (
          <ModalImage alt={item?.title} small={Laptop} large={Laptop} />
        )}
      </CartRowData>
      <CartRowData styles={styles}>
        <Text>{item?.title}</Text>
      </CartRowData>
      <CartRowData styles={styles}>
        <Text>{price}</Text>
      </CartRowData>
      <CartRowData styles={styles}>
        <Text>{brand}</Text>
      </CartRowData>
      <CartRowData styles={styles}>
        <Menu name="color" matchWidth>
          <MenuButton
            w="full"
            as={Button}
            variant="ghost"
            color={styles.headColor}
            borderBottom="1px"
            borderColor="gray.400"
            roundedBottom="none"
          >
            {color}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              type="radio"
              name="color"
              onChange={handleColorChange}
              value={color}
            >
              {colors.map((color, index) => {
                return (
                  <MenuItemOption key={index} name="color" value={color}>
                    {color}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </CartRowData>
      <CartRowData styles={styles}>
        <NumberInput
          step={1}
          value={count}
          min={1}
          max={item.quantity}
          onChange={handleChangeCount}
          allowMouseWheel
          maxW={100}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </CartRowData>
      <CartRowData styles={styles}>
        {shipping && (
          <Icon
            as={FontAwesomeIcon}
            color="green.500"
            icon={['fal', 'check-circle']}
            size="2x"
          />
        )}
        {!shipping && (
          <Icon
            as={FontAwesomeIcon}
            color="red.500"
            size="2x"
            icon={['fal', 'times-circle']}
          />
        )}
      </CartRowData>
      <CartRowData styles={styles}>
        <IconButton
          colorScheme="red"
          variant="ghost"
          onClick={handleRemove}
          icon={<Icon as={FontAwesomeIcon} size="2x" icon={['fal', 'times']} />}
        />
      </CartRowData>
    </CartTableRow>
  );
};

export default CartRow;
