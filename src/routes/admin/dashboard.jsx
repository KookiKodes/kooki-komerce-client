// packages
import {
  Heading,
  Stack,
  HStack,
  Text,
  Grid,
  GridItem,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  Icon,
  Select,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'currency-formatter';
import { DateTime } from 'luxon';
import _ from 'lodash';

// hooks
import useAdminOrders from '../../lib/hooks/useAdminOrders';

const colors = {
  'Not Processed': 'gray',
  Processing: 'yellow',
  Dispatched: 'purple',
  Cancelled: 'red',
  Completed: 'green',
};

const AdminDashboard = ({ authtoken }) => {
  const { orders, updateStatus } = useAdminOrders({
    authtoken,
    load: true,
  });

  const styles = useColorModeValue(
    {
      bg: '300',
      color: '900',
      selectBg: '200',
      selectHover: '100',
    },
    { bg: '700', color: '100', selectBg: '600', selectHover: '500' }
  );

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={12} my={4}>
      <GridItem colSpan={9} colStart={2} w="full" textAlign="center">
        <Heading>Admin Dashboard</Heading>
        <Divider mt={3} />
      </GridItem>
      {orders.map((order, index) => {
        const color = colors[order.orderStatus];
        const amount = format(_.round(order.paymentIntent.amount / 100, 2), {
          code: 'USD',
        });
        const currency = _.toUpper(order.paymentIntent.currency);
        const payment = _.toUpper(order.paymentIntent.status);
        const ordered = DateTime.fromSeconds(
          order.paymentIntent.created
        ).toFormat('ff');
        return (
          <GridItem
            colSpan={9}
            colStart={2}
            p={6}
            key={index}
            w="full"
            bg={`${color}.${styles.bg}`}
            color={`${color}.${styles.color}`}
            _hover={{
              shadow: 'xl',
            }}
            transition="box-shadow .3s ease"
            as={Stack}
            rounded="md"
            shadow="md"
            borderWidth="1px"
          >
            <HStack>
              <Breadcrumb
                fontSize="xl"
                separator={
                  <Icon
                    as={FontAwesomeIcon}
                    icon={['fas', 'grip-lines-vertical']}
                    size="sm"
                  />
                }
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
                  <Text>
                    Method: {order.paymentIntent.payment_method_types[0]}
                  </Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Text>Payment: {payment}</Text>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Text>Ordered On: {ordered}</Text>
                </BreadcrumbItem>
              </Breadcrumb>
            </HStack>
            <InputGroup
              role="group"
              _hover={{ shadow: 'lg' }}
              transition="box-shadow .3s ease;background .3s ease"
            >
              <InputLeftAddon
                as="label"
                htmlFor={`status-${order.paymentIntent.id}`}
              >
                <Icon as={FontAwesomeIcon} icon={['fas', 'calendar-week']} />
              </InputLeftAddon>
              <Select
                defaultValue={order.orderStatus}
                name="status"
                variant="filled"
                roundedLeft="none"
                id={`status-${order.paymentIntent.id}`}
                onChange={e => updateStatus(order._id, e.target.value)}
                bg={`${color}.${styles.selectBg}`}
                _focus={{
                  bg: `${color}.${styles.selectHover}`,
                  shadow: 'outline',
                }}
                _groupHover={{
                  bg: `${color}.${styles.selectHover}`,
                }}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </Select>
            </InputGroup>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default AdminDashboard;
