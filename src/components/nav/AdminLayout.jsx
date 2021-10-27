import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';

const AdminLayout = () => {
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      templateRows="repeat(12, min-content)"
      h="min-content"
      overflowX="hidden"
    >
      <GridItem
        colSpan={4}
        colStart={1}
        colEnd={3}
        rowSpan={12}
        position="relative"
      >
        <AdminNav />
      </GridItem>
      <GridItem colSpan={8} colStart={4} rowSpan={12} position="relative">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default AdminLayout;
