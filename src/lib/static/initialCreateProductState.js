import Color from '../enums/Color';
import Brand from '../enums/Brand';

const colors = Color.getKeys({ original: true });
const brands = Brand.getKeys({ original: true });

const initialState = {
  title: '',
  description: '',
  price: 0.01,
  categories: [],
  category: { name: 'Select a category' },
  subs: [],
  shipping: 'Yes',
  quantity: 1,
  images: [],
  colors,
  brands,
  color: colors[0],
  brand: brands[0],
  ratings: [],
};

export default initialState;
