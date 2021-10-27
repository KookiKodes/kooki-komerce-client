import { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Icon,
  Flex,
  GridItem,
  Divider,
  Badge,
  useToast,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import delay from 'delay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import CategoryTable from '../../components/admin/category/table';
import CategoryHead from '../../components/admin/category/table/CategoryHead';
import CategoryBody from '../../components/admin/category/table/CategoryBody';
import CategoryFooter from '../../components/admin/category/table/CategoryFooter';
import CategoryRows from '../../components/admin/category/table/CategoryRows';
import SubCategoryTable from '../../components/admin/sub/table';

//* functions
import {
  getCategories,
  removeCategory,
  updateCategory,
} from '../../lib/functions/category';

//helpers
import { toastError, toastSuccess } from '../../lib/helpers/toastHandlers';
import filter from '../../lib/helpers/categoryFilter';

// action types
import ActionTypes from '../../lib/enums/ActionTypes';

const dummyData = {
  name: 'dummy',
  createdAt: DateTime.now().toFormat('ff'),
  updatedAt: DateTime.now().toFormat('ff'),
};

const AdminCategory = ({ authtoken }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.page);
  const toast = useToast();
  const [categories, setCategories] = useState([
    dummyData,
    dummyData,
    dummyData,
    dummyData,
  ]);
  const [keyword, setKeyword] = useState('');
  const [by, setBy] = useState('Updated');
  const [order, setOrder] = useState('dsc');

  const loadCategories = useCallback(async () => {
    dispatch({ type: ActionTypes.page_loading_on });
    try {
      const { data } = await getCategories();
      setCategories(
        data.map((c, index) => {
          c.index = index;
          return c;
        })
      );
      await delay(500);
      dispatch({ type: ActionTypes.page_loading_off });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: ActionTypes.page_loading_off });
    }
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  async function onUpdate(category, value) {
    const { slug } = category;
    try {
      const response = await updateCategory({
        slug,
        authtoken,
        category: { ...category, name: value },
      });

      const updatedCategories = categories.filter(
        category => category.slug !== slug
      );
      setCategories([response.data, ...updatedCategories]);
      toast(
        toastSuccess(
          'Category Updated',
          `"${category.name}" was successfully updated to "${response.data.name}."`
        )
      );
    } catch (err) {
      toast(toastError(err.message));
    }
  }

  async function onDelete(category) {
    const { slug } = category;
    try {
      await removeCategory({
        slug,
        authtoken,
      });
      toast(
        toastSuccess(
          'Category Deleted',
          `"${category.name}" was successfully removed.`
        )
      );
      const newCatagories = categories.filter(
        category => category.slug !== slug
      );
      setCategories(newCatagories);
    } catch (err) {
      console.log(err);
      toast(toastError(err.message));
    }
  }

  const filteredCategories = filter(keyword)(by)(order)(categories);

  return (
    <Flex w="full" h="full" alignItems="start" justifyContent="center">
      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="repeat(3, min-content)"
        w="full"
        h="min-content"
        gap={10}
      >
        <GridItem
          as={Flex}
          display="flex"
          alignItems="center"
          flexDir="column"
          justifyContent="center"
          rowSpan={1}
          colSpan={12}
          rowStart={3}
          rowEnd={3}
        >
          <Editable
            as={Flex}
            placeholder="Categories"
            fontSize="4xl"
            fontWeight="bold"
            value={keyword}
            onEdit={() => setBy('Name')}
            onChange={e => setKeyword(e)}
            position="relative"
            w="full"
            justifyContent="center"
            alignItems="center"
          >
            <Badge
              position="absolute"
              left={0}
              fontSize="2xl"
              colorScheme="blue"
            >
              Search
              <Icon
                as={FontAwesomeIcon}
                icon={['fal', 'long-arrow-right']}
                ml={2}
              />
            </Badge>
            <EditableInput px={4} w="min-content" minW="min-content" />
            <EditablePreview />
          </Editable>
          <Divider my={2} />
          <CategoryTable>
            <CategoryHead
              by={by}
              order={order}
              setOrder={setOrder}
              setBy={setBy}
            />
            <CategoryBody>
              <CategoryRows
                categories={categories}
                filteredCategories={filteredCategories}
                updateCategories={setCategories}
                keyword={keyword}
                token={authtoken}
                onDelete={onDelete}
                onUpdate={onUpdate}
                loading={loading}
              >
                <SubCategoryTable
                  parentCategories={categories}
                  token={authtoken}
                />
              </CategoryRows>
            </CategoryBody>
            <CategoryFooter />
          </CategoryTable>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default AdminCategory;
