// packages
import {
  Flex,
  Grid,
  GridItem,
  Divider,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unformat } from 'currency-formatter';
import delay from 'delay';

// helpers
import { toastError, toastSuccess } from '../../lib/helpers/toastHandlers';

// components
import ProductForm from '../../components/admin/product/ProductForm';

// functions
import { createProduct } from '../../lib/functions/product';
import { getCategories } from '../../lib/functions/category';
import { getParentSubs } from '../../lib/functions/sub';

// actions
import ActionTypes from '../../lib/enums/ActionTypes';

// static
import initialState from '../../lib/static/initialCreateProductState';

// enums
import Color from '../../lib/enums/Color';
import Brand from '../../lib/enums/Brand';

function AdminProductCreate({ authtoken }) {
  const [values, setValues] = useState(initialState);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const { loading } = useSelector(state => state.page);
  const toast = useToast();
  const dispatch = useDispatch();

  const loadCategories = useCallback(async () => {
    dispatch({ type: ActionTypes.page_loading_on });
    try {
      const { data: categories } = await getCategories();
      if (!categories.length) {
        dispatch({ type: ActionTypes.page_loading_off });
        return;
      }
      setValues(values => ({
        ...values,
        categories,
        category: categories[0],
      }));
      await delay(500);
      dispatch({ type: ActionTypes.page_loading_off });
    } catch (err) {
      toast(toastError(err.message));
      dispatch({ type: ActionTypes.page_loading_off });
    }
  }, [dispatch, toast]);

  const loadSubCategories = useCallback(async () => {
    if (!values.category._id) return;
    setLoadingSubs(true);
    try {
      const { data: subs } = await getParentSubs({
        parentId: values.category._id,
      });
      await delay(500);
      setSubOptions(subs);
      setValues(values => ({ ...values, subs: [] }));
      setLoadingSubs(false);
    } catch (err) {
      toast(toastError(err.message));
      setLoadingSubs(false);
    }
  }, [toast, values.category._id]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadSubCategories();
  }, [values.category?.name, loadSubCategories]);

  async function onCreate() {
    dispatch({ type: ActionTypes.page_loading_on });
    const product = {
      ...values,
      price: unformat(values.price, { code: 'USD' }),
      color: Color[Color[values.color]],
      brand: Brand[Brand[values.brand]],
    };
    try {
      await createProduct({ product, authtoken });
      toast(
        toastSuccess(
          'Product Created',
          'You have successfully created a new product'
        )
      );
      setValues(values => ({
        ...initialState,
        categories: values.categories,
        category: values.categories[0],
      }));
      dispatch({ type: ActionTypes.page_loading_off });
    } catch (err) {
      console.log(err);
      toast(toastError(err.response.data.message));
      dispatch({ type: ActionTypes.page_loading_off });
    }
  }

  const handleChange = ({ name, value }) =>
    setValues(values => ({ ...values, [name]: value }));

  return (
    <Grid templateColumns="repeat(12, 1fr)" w="full">
      <GridItem
        as={Flex}
        flexDir="column"
        colSpan={12}
        w="full"
        justifyContent="center"
        alignItems="center"
        py={8}
      >
        <Heading>Create Product</Heading>
        <Divider my={4} />
      </GridItem>
      <ProductForm
        onCreate={onCreate}
        onChange={handleChange}
        values={values}
        loading={loading}
        loadingSubs={loadingSubs}
        subOptions={subOptions}
      />
    </Grid>
  );
}

export default AdminProductCreate;
