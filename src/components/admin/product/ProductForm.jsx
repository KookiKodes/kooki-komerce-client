// packages
import {
  Grid,
  Wrap,
  FormHelperText,
  Text,
  GridItem,
  Menu,
  MenuOptionGroup,
  MenuButton,
  MenuItemOption,
  MenuList,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  NumberInput,
  NumberInputField,
  InputLeftAddon,
  Button,
  IconButton,
  Icon,
  Tag,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, unformat } from 'currency-formatter';

// components
import FileUpload from './FileUpload';

const ProductForm = ({
  onCreate,
  onChange,
  values,
  loading,
  loadingSubs,
  subOptions,
}) => {
  async function handleSubmit(e) {
    e.preventDefault();
    onCreate();
  }
  const handleChange = ({ name, value }) => onChange({ value, name });

  return (
    <GridItem as="form" onSubmit={handleSubmit} colSpan={12}>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <FormControl as={GridItem} colSpan={2} id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <InputGroup variant="filled">
            <Input
              type="text"
              name="title"
              value={values.title}
              onChange={({ target: { value, name } }) =>
                handleChange({ value, name })
              }
            />
          </InputGroup>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <InputGroup variant="filled">
            <Input
              type="text"
              name="description"
              value={values.description}
              onChange={({ target: { value, name } }) =>
                handleChange({ value, name })
              }
            />
          </InputGroup>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="price">
          <FormLabel>Price</FormLabel>
          <InputGroup>
            <InputLeftAddon p={0} overflow="hidden">
              <IconButton
                as="label"
                htmlFor="price"
                variant="solid"
                size="md"
                cursor="pointer"
                borderRadius="none"
                icon={
                  <Icon as={FontAwesomeIcon} icon={['fas', 'dollar-sign']} />
                }
              />
            </InputLeftAddon>
            <NumberInput
              w="full"
              allowMouseWheel
              id="price"
              name="price"
              variant="filled"
              min={0.01}
              pattern="^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$"
              value={values.price}
              onBlur={({ target: { name, value } }) => {
                handleChange({
                  value: format(value || 0.01, {
                    code: 'USD',
                    precision: 2,
                    format: '%v',
                  }),
                  name,
                });
              }}
              onFocus={({ target: { value, name } }) =>
                handleChange({
                  value: unformat(value || 0.01, { code: 'USD' }),
                  name,
                })
              }
              onChange={value =>
                handleChange({
                  value,
                  name: 'price',
                })
              }
            >
              <NumberInputField
                px={4}
                borderTopLeftRadius="none"
                borderBottomLeftRadius="none"
              />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="shipping">
          <FormLabel>Shipping</FormLabel>
          <Menu name="shipping" matchWidth>
            <MenuButton
              w="full"
              as={Button}
              rightIcon={
                <Icon as={FontAwesomeIcon} icon={['fal', 'chevron-down']} />
              }
            >
              {values.shipping}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                name="shipping"
                value={values.shipping}
                onChange={value => handleChange({ value, name: 'shipping' })}
              >
                <MenuItemOption value="Yes">Yes</MenuItemOption>
                <MenuItemOption value="No">No</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="quantity">
          <FormLabel>Quantity</FormLabel>
          <InputGroup>
            <NumberInput
              w="full"
              allowMouseWheel
              name="quantity"
              variant="filled"
              min={1}
              value={values.quantity}
              onChange={value => handleChange({ value, name: 'quantity' })}
              keepWithinRange
            >
              <NumberInputField px={4} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="color">
          <FormLabel>Color</FormLabel>
          <Menu name="color" matchWidth>
            <MenuButton
              w="full"
              as={Button}
              leftIcon={<Tag fontWeight="black">{values.colors.length}</Tag>}
              rightIcon={
                <Icon as={FontAwesomeIcon} icon={['fal', 'chevron-down']} />
              }
            >
              {values.color}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                name="color"
                value={values.color}
                onChange={value => handleChange({ value, name: 'color' })}
              >
                {values.colors.map((color, index) => {
                  return (
                    <MenuItemOption value={color} key={index}>
                      {color}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="brand">
          <FormLabel>Brand</FormLabel>
          <Menu name="brand" matchWidth>
            <MenuButton
              w="full"
              as={Button}
              leftIcon={<Tag fontWeight="black">{values.brands.length}</Tag>}
              rightIcon={
                <Icon as={FontAwesomeIcon} icon={['fal', 'chevron-down']} />
              }
            >
              {values.brand}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                name="brand"
                value={values.brand}
                onChange={value => handleChange({ value, name: 'brand' })}
              >
                {values.brands.map((brand, index) => {
                  return (
                    <MenuItemOption value={brand} key={index}>
                      {brand}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="category">
          <FormLabel>Category</FormLabel>
          <Menu name="category" matchWidth>
            <MenuButton
              w="full"
              as={Button}
              leftIcon={
                <Skeleton isLoaded={!loading && !loadingSubs}>
                  <Tag fontWeight="black">{values.categories.length}</Tag>
                </Skeleton>
              }
              rightIcon={
                <Icon as={FontAwesomeIcon} icon={['fal', 'chevron-down']} />
              }
              isDisabled={loading}
            >
              <SkeletonText isLoaded={!loading && !loadingSubs} noOfLines={2}>
                {values.category.name}
              </SkeletonText>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                name="category"
                defaultValue="Null"
                value={values.category._id}
                onChange={value => handleChange({ value, name: 'category' })}
              >
                {values.categories.map(category => {
                  const isChecked = values.category.name === category.name;
                  return (
                    <MenuItemOption
                      value={category}
                      key={category._id}
                      position="relative"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {isChecked && (
                        <Icon
                          as={FontAwesomeIcon}
                          icon={['fal', 'check']}
                          position="absolute"
                          left={4}
                          top={2}
                        />
                      )}
                      {category.name}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </FormControl>
        <FormControl as={GridItem} colSpan={2} id="sub">
          <FormLabel>Sub-categories</FormLabel>
          <Menu name="category" matchWidth>
            <MenuButton
              w="full"
              as={Button}
              position="relative"
              display="flex"
              leftIcon={
                <Skeleton isLoaded={!loadingSubs}>
                  <Tag fontWeight="black">{subOptions.length}</Tag>
                </Skeleton>
              }
              rightIcon={
                <Icon as={FontAwesomeIcon} icon={['fal', 'chevron-down']} />
              }
              isDisabled={loadingSubs}
            >
              <SkeletonText isLoaded={!loadingSubs} noOfLines={2}>
                Select sub-categories
              </SkeletonText>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="checkbox"
                name="category"
                value={values.subs}
                onChange={value => {
                  handleChange({ value, name: 'subs' });
                }}
              >
                {subOptions.map(sub => {
                  return (
                    <MenuItemOption
                      value={sub._id}
                      key={sub._id}
                      position="relative"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {sub.name}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <FormHelperText as={Wrap} position="relative" minH={6}>
            <Text as={Wrap} top={0} spacing={2}>
              {values.subs.map((id, index) => {
                if (!subOptions.length) return null;
                const sub = subOptions.find(({ _id }) => _id === id);
                if (!sub) return null;
                return (
                  <Tag key={id} pr={0} colorScheme="blue">
                    {sub.name}
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      onClick={() =>
                        handleChange({
                          value: values.subs
                            .slice(0, index)
                            .concat(values.subs.slice(index + 1)),
                          name: 'subs',
                        })
                      }
                      icon={
                        <Icon as={FontAwesomeIcon} icon={['fal', 'times']} />
                      }
                      size="xs"
                    />
                  </Tag>
                );
              })}
            </Text>
          </FormHelperText>
        </FormControl>
        <FileUpload values={values} onChange={handleChange} />
        <GridItem colSpan={4}>
          <Button
            id="submitProduct"
            w="full"
            type="submit"
            colorScheme="yellow"
          >
            Save
          </Button>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default ProductForm;
