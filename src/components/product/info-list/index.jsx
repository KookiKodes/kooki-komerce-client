import {
  Grid,
  GridItem,
  Stack,
  Tag,
  Heading,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';

const InfoList = ({ children, title, rating, actions, setHeight }) => {
  const styles = useColorModeValue(
    { border: 'gray.200', bg: 'gray.100' },
    { border: 'whiteAlpha.200', bg: 'whiteAlpha.100' }
  );
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      w="full"
      ref={newRef => setHeight(newRef?.clientHeight)}
    >
      <GridItem
        as={Tag}
        alignItems="center"
        justifyContent="center"
        colSpan={12}
        colorScheme="yellow"
        variant="outline"
        py={4}
        mb={6}
      >
        <Heading size="2xl">{title}</Heading>
      </GridItem>
      <GridItem colSpan={12} mb={6}>
        <Center>{rating}</Center>
      </GridItem>
      <GridItem
        as={Stack}
        colSpan={12}
        spacing={4}
        p={8}
        borderWidth="2px 2px 0 2px"
        borderColor={styles.border}
        roundedTop="md"
      >
        {children}
      </GridItem>
      <GridItem
        colSpan={12}
        borderWidth="2px 2px 2px 2px"
        borderColor={styles.border}
        bg={styles.bg}
      >
        {actions}
      </GridItem>
    </Grid>
  );
};

export default InfoList;
