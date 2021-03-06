import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { format } from 'currency-formatter';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ {DateTime.now().toFormat('ff')} ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>Kooki Komerce</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={x => x.product.title} />
            <DataTableCell
              getContent={x =>
                format(_.round(x.product.price, 2), { code: 'USD' })
              }
            />
            <DataTableCell getContent={x => x.count} />
            <DataTableCell getContent={x => x.product.brand} />
            <DataTableCell getContent={x => x.color} />
          </TableBody>
        </Table>
        <Text style={styles.text}>
          <Text>
            Date:{' '}
            {DateTime.fromSeconds(order.paymentIntent.created).toFormat('ff')}
          </Text>
          {'\n'}
          <Text>Order Id: {order.paymentIntent.id}</Text>
          {'\n'}
          <Text>Order Status: {order.orderStatus}</Text>
          {'\n'}
          <Text>
            Total Paid:{' '}
            {format(_.round(order.paymentIntent.amount / 100), { code: 'USD' })}
          </Text>
        </Text>

        <Text style={styles.footer}>~ Thank you for shopping with us ~</Text>
      </Page>
    </Document>
  );
};

export default Invoice;
