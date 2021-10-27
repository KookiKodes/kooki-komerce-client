// packages
import {
  Grid,
  Flex,
  Divider,
  GridItem,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { unformat } from 'currency-formatter';
import delay from 'delay';

// components
import ProductForm from '../../../components/admin/product/ProductForm';

// static
import initialState from '../../../lib/static/initialCreateProductState';

// helpers
import { toastError, toastSuccess } from '../../../lib/helpers/toastHandlers';

// functions
import { getProduct, updateProduct } from '../../../lib/functions/product';
import { getCategories } from '../../../lib/functions/category';
import { getParentSubs } from '../../../lib/functions/sub';

// enums
import ActionTypes from '../../../lib/enums/ActionTypes';
import Color from '../../../lib/enums/Color';
import Brand from '../../../lib/enums/Brand';

const AdminEditProduct = ({ authtoken }) => {
  const [values, setValues] = useState(initialState);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const { loading } = useSelector(state => state.page);
  const toast = useToast();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const resetSubCategories = useRef(false);

  const loadSubCategories = useCallback(async () => {
    if (!values.category._id) return;
    setLoadingSubs(true);
    try {
      const { data: subs } = await getParentSubs({
        parentId: values.category._id,
      });
      await delay(500);
      if (resetSubCategories.current)
        setValues(values => ({ ...values, subs: [] }));
      setSubOptions(subs);
      setLoadingSubs(false);
      resetSubCategories.current = true;
    } catch (err) {
      toast(toastError(err.message));
      setLoadingSubs(false);
      resetSubCategories.current = true;
    }
  }, [toast, values.category._id]);
  const loadProduct = useCallback(async () => {
    dispatch({ type: ActionTypes.page_loading_on });
    try {
      const { data: product } = await getProduct({ slug: params.slug });
      if (!product?.title) {
        dispatch({ type: ActionTypes.page_loading_off });
        navigate(-1, { state: location });
      }
      setValues(values => ({
        ...values,
        ...product,
        brand: Brand.getKeys({ original: true }).find(
          key => key.toLowerCase() === product.brand.toLowerCase()
        ),
        color: Color.getKeys({ original: true }).find(
          key => key.toLowerCase() === product.color.toLowerCase()
        ),
      }));
      await delay(500);
      dispatch({ type: ActionTypes.page_loading_off });
    } catch (err) {
      console.log(err.message);
      toast(toastError(err.message));
      dispatch({ type: ActionTypes.page_loading_off });
    }
  }, [dispatch, location, navigate, params.slug, toast]);

  const loadCategories = useCallback(async () => {
    try {
      const { data: categories } = await getCategories();
      setValues(values => ({
        ...values,
        categories,
      }));
      await delay(500);
    } catch (err) {
      toast(toastError(err.message));
    }
  }, [toast]);

  useEffect(() => {
    loadCategories();
    loadProduct();
  }, [loadCategories, loadProduct]);

  useEffect(() => {
    loadSubCategories();
  }, [values.category.name, loadSubCategories]);

  async function onCreate() {
    dispatch({ type: ActionTypes.page_loading_on });
    const product = {
      ...values,
      price: unformat(values.price, { code: 'USD' }),
      color: Color[Color[values.color]],
      brand: Brand[Brand[values.brand]],
    };
    const { slug } = product;
    try {
      const response = await updateProduct({ slug, product, authtoken });
      console.log(response);
      toast(
        toastSuccess(
          'Product Updated',
          `You have successfully updated product: ${response.data.title}`
        )
      );
      dispatch({ type: ActionTypes.page_loading_off });
      navigate('/admin/products', { state: location });
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
        colSpan={9}
        w="full"
        justifyContent="center"
        alignItems="center"
        py={8}
        colStart={2}
      >
        <Heading>Edit {values.title}</Heading>
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
};

export default AdminEditProduct;
