import Enum from './Enum';

const ActionTypes = Enum([
  'login',
  'logout',
  'user_loading_on',
  'user_loading_off',
  'page_loading_on',
  'page_loading_off',
  'search_query',
  'add_to_cart',
  'remove_from_cart',
  'update_cart',
  'cart_drawer_on',
  'cart_drawer_off',
  'cart_drawer_toggle',
  'empty_cart',
]);

export default ActionTypes;
