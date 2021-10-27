// packages
import {
  Center,
  GridItem,
  Image,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { format } from 'currency-formatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// enums
import Brand from '../lib/enums/Brand';
import Color from '../lib/enums/Color';

// static
import LaptopImage from './product/images/laptop.png';

const CartRowData = ({ item, styles, index, onRemove }) => {
  const brand = Brand.getKeys({ original: true }).find(
    key => key.toUpperCase() === item.brand
  );
  const color = Color.getKeys({ original: true }).find(
    key => key.toUpperCase() === item.color
  );

  function handleRemove() {
    if (onRemove) {
      onRemove(item);
    }
  }

  return (
    <>
      <GridItem
        as={Center}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
      >
        <Image
          src={item.images[0]?.url}
          alt={item.title}
          fallbackSrc={LaptopImage}
        />
      </GridItem>
      <GridItem
        as={Center}
        p={2}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
      >
        <Text>{item.title}</Text>
      </GridItem>
      <GridItem
        as={Center}
        p={2}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
        textAlign="center"
      >
        <Text>{format(item.price, { code: 'USD' })}</Text>
      </GridItem>
      <GridItem
        as={Center}
        p={2}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
        textAlign="center"
      >
        <Text>{brand}</Text>
      </GridItem>
      <GridItem
        as={Center}
        p={2}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
        textAlign="center"
      >
        <Text>{color}</Text>
      </GridItem>
      <GridItem
        as={Center}
        p={2}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
        textAlign="center"
      >
        <Text>{item.count}</Text>
      </GridItem>
      <GridItem
        as={Center}
        p={2}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
        textAlign="center"
      >
        {item.shipping === 'Yes' && (
          <Icon
            color="green.500"
            as={FontAwesomeIcon}
            icon={['fal', 'check-circle']}
          />
        )}
        {item.shipping === 'No' && (
          <Icon
            color="red.500"
            as={FontAwesomeIcon}
            icon={['fal', 'times-circle']}
          />
        )}
      </GridItem>
      <GridItem
        as={Center}
        p={2}
        rowStart={index + 2}
        border="1px"
        borderColor={styles.border}
        textAlign="center"
      >
        <IconButton
          colorScheme="red"
          variant="ghost"
          onClick={handleRemove}
          icon={<Icon as={FontAwesomeIcon} icon={['fal', 'times']} />}
        />
      </GridItem>
    </>
  );
};

export default CartRowData;
