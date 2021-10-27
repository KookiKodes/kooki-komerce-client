// packages
import {
  Grid,
  Tag,
  GridItem,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  Table,
  Thead,
  Tbody,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Tr,
  Th,
  Td,
  HStack,
  Button,
  Center,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'currency-formatter';
import { DateTime } from 'luxon';
import { PDFDownloadLink } from '@react-pdf/renderer';
import _ from 'lodash';

// hooks
import useGetOrders from '../../lib/hooks/useGetOrders';
import Invoice from '../../components/Invoice';

const ProductRow = ({ p }) => {
  const shipping = p.product.shipping === 'Yes' ? true : false;
  return (
    <Tr>
      <Td>
        <Heading fontSize="md">{p.product.title}</Heading>
      </Td>
      <Td>
        <Text>{format(p.product.price, { code: 'USD' })}</Text>
      </Td>
      <Td>
        <Text>{p.color}</Text>
      </Td>
      <Td>
        <Text>{p.product.brand}</Text>
      </Td>
      <Td isNumeric>
        <Center>
          <Text>{p.count}</Text>
        </Center>
      </Td>
      <Td>
        <Center>
          {shipping && (
            <Icon
              as={FontAwesomeIcon}
              color="green.500"
              icon={['fal', 'check-circle']}
              size="lg"
            />
          )}
          {!shipping && (
            <Icon
              as={FontAwesomeIcon}
              color="red.500"
              icon={['fal', 'times-circle']}
              size="lg"
            />
          )}
        </Center>
      </Td>
    </Tr>
  );
};

const ProductTable = ({ order }) => {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Price</Th>
          <Th>Color</Th>
          <Th>Brand</Th>
          <Th isNumeric>Count</Th>
          <Th>Shipping</Th>
        </Tr>
      </Thead>
      <Tbody>
        {order.products.map((product, index) => (
          <ProductRow p={product} key={index} />
        ))}
      </Tbody>
    </Table>
  );
};

const ShowPaymentInfo = ({ order }) => {
  const amount = format(_.round(order.paymentIntent.amount / 100, 2), {
    code: 'USD',
  });
  const currency = _.toUpper(order.paymentIntent.currency);
  const payment = _.toUpper(order.paymentIntent.status);
  const ordered = DateTime.fromSeconds(order.paymentIntent.created).toFormat(
    'ff'
  );
  return (
    <Breadcrumb
      as={Tag}
      p={4}
      separator={<Icon as={FontAwesomeIcon} icon={['fal', 'chevron-right']} />}
    >
      <BreadcrumbItem>
        <Text>Order Id: {order.paymentIntent.id}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text>Amount: {amount}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text>Currency: {currency}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text>Method: {order.paymentIntent.payment_method_types[0]}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text>Payment: {payment}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text>Ordered On: {ordered}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Badge h="min-content" colorScheme="blue" fontSize="sm">
          STATUS: {order.orderStatus}
        </Badge>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const DownloadLink = ({ order }) => {
  return (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName={`invoice-${order.paymentIntent.id}.pdf`}
    >
      Download PDF
    </PDFDownloadLink>
  );
};

const UserHistory = ({ authtoken }) => {
  const { orders, loading } = useGetOrders({
    authtoken,
    load: true,
  });

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      w="full"
      templateRows="repeat(12, min-content)"
      gap={6}
    >
      <GridItem rowSpan={1} colSpan={12} pt={10}>
        <Center>
          <Skeleton isLoaded={!loading}>
            {orders.length > 0 && <Heading>Purchase History</Heading>}
            {orders.length < 1 && <Heading>No Purchases Made</Heading>}
          </Skeleton>
        </Center>
      </GridItem>
      <GridItem colSpan={10} colStart={2} as={Stack} spacing={6}>
        {orders.map((order, index) => {
          return (
            <Stack
              key={index}
              borderWidth="2px"
              align="center"
              p={4}
              shadow="lg"
              rounded="md"
              transition="box-shadow .3s ease"
              _hover={{ shadow: 'xl' }}
              spacing={6}
            >
              <ShowPaymentInfo order={order} />
              <Accordion allowToggle w="full">
                <AccordionItem>
                  <AccordionButton p={4}>
                    <HStack
                      display="flex"
                      align="center"
                      justify="center"
                      w="full"
                      spacing={6}
                    >
                      <Text>View Order Contents</Text>
                      <AccordionIcon
                        as={FontAwesomeIcon}
                        icon={['fal', 'chevron-down']}
                        size="lg"
                      />
                    </HStack>
                  </AccordionButton>
                  <AccordionPanel>
                    <ProductTable order={order} key={index} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Button colorScheme="yellow">
                <DownloadLink order={order} />
              </Button>
            </Stack>
          );
        })}
      </GridItem>
    </Grid>
  );
};

export default UserHistory;
