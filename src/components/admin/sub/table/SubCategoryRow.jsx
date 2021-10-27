// packages
import {
  Grid,
  GridItem,
  useColorModeValue,
  SkeletonText,
  Flex,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';

// components
import Highlighted from '../../../Highlighted';
import DeleteAction from '../../actions/DeleteAction';
import UpdateCategoryAction from '../../actions/UpdateCategoryAction';

const SubCategoryRow = ({
  even,
  category,
  loading,
  keyword,
  onUpdate,
  onDelete,
  parent,
}) => {
  const styles = useColorModeValue(
    {
      bg: !even ? 'yellow.300' : 'gray.200',
      color: !even ? 'yellow.900' : 'gray.900',
      psuedoBg: !even ? 'yellow.400' : 'gray.300',
    },
    {
      bg: !even ? 'yellow.700' : 'gray.700',
      color: !even ? 'yellow.100' : 'gray.200',
      psuedoBg: !even ? 'yellow.600' : 'gray.600',
    }
  );
  return (
    <GridItem
      px={2}
      py={4}
      rowSpan={1}
      colSpan={4}
      bg={styles.bg}
      color={styles.color}
      _hover={{ bg: styles.psuedoBg }}
      fontWeight="bold"
      transition="background ease .3s"
    >
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem as={Flex} alignItems="center" colSpan={1}>
          <SkeletonText isLoaded={!loading} noOfLines={2}>
            <Highlighted text={category.name} highlight={keyword} />
          </SkeletonText>
        </GridItem>
        <GridItem colSpan={1} as={Flex} alignItems="center">
          <SkeletonText isLoaded={!loading} noOfLines={2}>
            {DateTime.fromISO(category.createdAt).toFormat('ff')}
          </SkeletonText>
        </GridItem>
        <GridItem colSpan={1} as={Flex} alignItems="center">
          <SkeletonText isLoaded={!loading} noOfLines={2}>
            {DateTime.fromISO(category.updatedAt).toFormat('ff')}
          </SkeletonText>
        </GridItem>
        <GridItem colSpan={1} as={Flex} alignItems="center">
          <UpdateCategoryAction
            {...category}
            isDisabled={loading}
            onUpdate={value => onUpdate({ parent, category, name: value })}
          />
          <DeleteAction
            context={category}
            name={category.name}
            isDisabled={loading}
            onDelete={() => onDelete({ category })}
          >
            Are you sure you want to delete {category.name} sub-category
            permanently?
          </DeleteAction>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default SubCategoryRow;
