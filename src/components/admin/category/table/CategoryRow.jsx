// packages
import {
  useColorModeValue,
  GridItem,
  SkeletonText,
  Grid,
  Flex,
  AccordionPanel,
  AccordionItem,
  ButtonGroup,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { cloneElement } from 'react';

// components
import Highlighted from '../../../Highlighted';
import DeleteAction from '../../actions/DeleteAction';
import UpdateCategoryAction from '../../actions/UpdateCategoryAction';
import ViewSubCategoriesAction from '../../actions/ViewSubCategoriesAction';

const CategoryRow = ({
  category,
  keyword,
  onDelete,
  onUpdate,
  even,
  loading,
  children,
}) => {
  const styles = useColorModeValue(
    {
      bg: !even ? 'yellow.400' : 'gray.300',
      color: !even ? 'yellow.900' : 'gray.900',
      border: !even ? 'yellow.400' : 'gray.300',
    },
    {
      bg: !even ? 'yellow.700' : 'gray.700',
      color: !even ? 'yellow.100' : 'gray.200',
      border: !even ? 'yellow.700' : 'gray.700',
    }
  );
  return (
    <GridItem as={AccordionItem} rowSpan={1} colSpan={4}>
      <Grid w="full" templateColumns="repeat(4, 1fr)">
        <GridItem
          px={2}
          py={4}
          rowSpan={1}
          colSpan={4}
          bg={styles.bg}
          color={styles.color}
          transition="background ease .3s"
          fontWeight="bold"
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
            <GridItem as={ButtonGroup} colSpan={1}>
              <UpdateCategoryAction
                {...category}
                isDisabled={loading}
                onUpdate={value => onUpdate(category, value)}
              />
              <DeleteAction
                context={category}
                name={category.name}
                isDisabled={loading}
                onDelete={() => onDelete(category)}
              >
                Are you sure you want to delete {category.name} category
                permanently?
              </DeleteAction>
              <ViewSubCategoriesAction isDisabled={loading} />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={4}
          border=".5rem solid"
          borderColor={styles.border}
        >
          <AccordionPanel py={4} px={10}>
            {cloneElement(children, { parent: category })}
          </AccordionPanel>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default CategoryRow;
