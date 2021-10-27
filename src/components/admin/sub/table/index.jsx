import { Grid, GridItem, useToast } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import delay from 'delay';

// components
import SubCategoryTableBody from './SubCategoryTableBody';
import SubCategoryRows from './SubCategoryRows';
import SubCategoryTableHeader from './SubCategoryTableHeader';
import SubCategoryTableHead from './SubCategoryTableHead';
import SubCategoryTableFooter from './SubCategoryTableFooter';

// functions
import {
  getParentSubs,
  createSub,
  updateSub,
  removeSub,
} from '../../../../lib/functions/sub';

// helpers
import filter from '../../../../lib/helpers/categoryFilter';
import {
  toastError,
  toastSuccess,
} from '../../../../lib/helpers/toastHandlers';

const SubCategoryTable = ({ children, parentCategories, ...rest }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [by, setBy] = useState('Updated');
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('asc');

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getParentSubs({ parentId: rest.parent._id });
      setCategories(response.data);
      await delay(500);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [rest.parent._id]);

  useEffect(() => {
    if (rest.parent._id) {
      loadCategories();
    }
  }, [rest.parent, loadCategories]);

  async function onCreate(name) {
    if (!name) return toast(toastError('Please provide a sub-category name'));
    const { _id: id } = rest.parent;
    try {
      const response = await createSub({
        authtoken: rest.token,
        category: { parent: id, name },
      });
      setCategories([response.data, ...categories]);
      toast(
        toastSuccess(
          'Created Sub-category',
          `You have successfully created a new sub-category for "${rest.parent.name}."`
        )
      );
    } catch (err) {
      console.log(err);
      toast(toastError(err.message));
    }
  }

  async function onUpdate({ parent, category, name }) {
    const { slug } = category;
    try {
      const response = await updateSub({
        slug,
        authtoken: rest.token,
        category: { ...category, name },
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

  async function onDelete({ category }) {
    const { slug } = category;
    try {
      await removeSub({
        slug,
        authtoken: rest.token,
      });
      toast(
        toastSuccess(
          'Category Deleted',
          `${category.name} was successfully removed.`
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
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(3, min-content)"
    >
      <GridItem colSpan={4} rowSpan={1}>
        <Grid>
          <SubCategoryTableHeader
            keyword={keyword}
            setBy={setBy}
            setKeyword={setKeyword}
            {...rest}
          />
          <SubCategoryTableHead
            order={order}
            by={by}
            setOrder={setOrder}
            setBy={setBy}
            {...rest}
          />
          <SubCategoryTableBody onCreate={onCreate} {...rest}>
            <SubCategoryRows
              loading={loading}
              loadCategories={loadCategories}
              filteredCategories={filteredCategories}
              categories={categories}
              keyword={keyword}
              onUpdate={onUpdate}
              onDelete={onDelete}
              {...rest}
            />
          </SubCategoryTableBody>
        </Grid>
        <SubCategoryTableFooter />
      </GridItem>
    </Grid>
  );
};

export default SubCategoryTable;
