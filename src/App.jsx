// packages
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';
import {
  getAuth,
  onIdTokenChanged,
  getIdTokenResult,
  signOut,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useRef, lazy, Suspense } from 'react';

// components
import Layout from './components/nav/Layout';
import UserLayout from './components/nav/UserLayout';
import AdminLayout from './components/nav/AdminLayout';
import { RequireCheckOutlet, RequireRoleOutlet } from './components/auth/Auth';

// enums
import ActionTypes from './lib/enums/ActionTypes';
import Role from './lib/enums/Role';

// helpers
import { currentUser, currentAdmin } from './lib/functions/auth';
import { getUserCart } from './lib/functions/user';

// main routes
// import Home from './routes/home';
// import ViewProduct from './routes/product/slug';
// import CategoryHome from './routes/category/slug';
// import SubCategoryHome from './routes/sub-category/slug';
// import Shop from './routes/shop';
// import Cart from './routes/cart';

// main routes as lazy
const Home = lazy(() => import('./routes/home'));
const ViewProduct = lazy(() => import('./routes/product/slug'));
const CategoryHome = lazy(() => import('./routes/category/slug'));
const SubCategoryHome = lazy(() => import('./routes/sub-category/slug'));
const Shop = lazy(() => import('./routes/shop'));
const Cart = lazy(() => import('./routes/cart'));

// guest only routes
// import GuestLogin from './routes/guest/login';
// import GuestRegister from './routes/guest/register';
// import GuestRegisterComplete from './routes/guest/register/complete';
// import GuestForgotPassword from './routes/guest/login/forgot-password';

// guest routes as lazy
const GuestLogin = lazy(() => import('./routes/guest/login'));
const GuestRegister = lazy(() => import('./routes/guest/register'));
const GuestRegisterComplete = lazy(() =>
  import('./routes/guest/register/complete')
);
const GuestForgotPassword = lazy(() =>
  import('./routes/guest/login/forgot-password')
);

// // user only routes
// import UserHistory from './routes/user/history';
// import UserPassword from './routes/user/password';
// import UserCheckout from './routes/user/checkout';
// import UserPayment from './routes/user/payment';
// import UserWishlist from './routes/user/wishlist';

// user only routes as lazy
const UserHistory = lazy(() => import('./routes/user/history'));
const UserPassword = lazy(() => import('./routes/user/password'));
const UserCheckout = lazy(() => import('./routes/user/checkout'));
const UserPayment = lazy(() => import('./routes/user/payment'));
const UserWishlist = lazy(() => import('./routes/user/wishlist'));

// // admin only routes
// import AdminDashboard from './routes/admin/dashboard';
// import AdminCategory from './routes/admin/category';
// import AdminProduct from './routes/admin/product';
// import AdminEditProduct from './routes/admin/product/slug';
// import AdminProducts from './routes/admin/products';
// import AdminManageCoupons from './routes/admin/coupons';

// admin only routes as lazy
const AdminDashboard = lazy(() => import('./routes/admin/dashboard'));
const AdminCategory = lazy(() => import('./routes/admin/category'));
const AdminProduct = lazy(() => import('./routes/admin/product'));
const AdminEditProduct = lazy(() => import('./routes/admin/product/slug'));
const AdminProducts = lazy(() => import('./routes/admin/products'));
const AdminManageCoupons = lazy(() => import('./routes/admin/coupons'));

// no match route
const Error404 = lazy(() => import('./routes/404'));

const handleLoginRoute = ({ user, location, Navigate }) => {
  if (location.state) {
    return <Navigate to={location.state.pathname} />;
  }
  switch (user.role) {
    case Role.ADMIN:
      return <Navigate to="/admin/dashboard" />;
    case Role.SUBSCRIBER:
      return <Navigate to="/user/history" />;
    default:
      return <Navigate to="/" />;
  }
};

const checkComplete = ({ location }) => {
  return (
    window.localStorage.getItem('emailForRegistration') ||
    location.pathname === '/guest/register'
  );
};

const handleAdminCheck = async ({ user }) => {
  if (user && user.token) {
    try {
      await currentAdmin(user.token);
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};

const handleCheckoutCheck = async ({ user }) => {
  if (user && user.token) {
    try {
      const { data: cart } = await getUserCart({ authtoken: user.token });
      if (cart?.products.length > 0) return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const user = useSelector(state => state.user);

  const logout = useCallback(async () => {
    signOut(getAuth());
    dispatch({
      type: ActionTypes.logout,
      payload: { role: Role.guest },
    });
    navigate('/guest/login', { from: location });
  }, [location, dispatch, navigate]);

  useEffect(() => {
    if (user.token && !intervalRef.current) {
      intervalRef.current = setInterval(async () => {
        const auth = getAuth();
        if (auth.currentUser && auth.currentUser.stsTokenManager.isExpired) {
          logout();
          clearInterval(intervalRef.current);
        }
      }, 60000);
    }
  }, [user, logout]);

  useEffect(() => {
    dispatch({ type: ActionTypes.user_loading_on });
    const auth = getAuth(),
      unsubscribe = onIdTokenChanged(auth, async user => {
        if (user) {
          const { token } = await getIdTokenResult(user);
          try {
            const res = await currentUser(token);
            const { email, name, role, _id } = res.data;
            dispatch({
              type: ActionTypes.login,
              payload: {
                email,
                name,
                token,
                role,
                _id,
                loading: false,
              },
            });
          } catch (err) {
            dispatch({ type: ActionTypes.user_loading_off });
            console.error(err);
          }
        } else dispatch({ type: ActionTypes.user_loading_off });
      });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <Center w="100vw" h="100vh">
          <Spinner size="xl" color="yellow.500" />
        </Center>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Route for home page: /guest */}
          <Route index element={<Home />} />
          <Route path="/product/:slug" element={<ViewProduct />} />
          <Route path="/category/:slug" element={<CategoryHome />} />
          <Route path="/sub-category/:slug" element={<SubCategoryHome />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />

          {/* All Routes for guest users: /guest */}
          <Route path="guest" element={<RequireRoleOutlet role={Role.GUEST} />}>
            {/* Route for providing additional routing check: /guest/login */}
            <Route
              path="login"
              element={
                <RequireRoleOutlet
                  role={Role.Guest}
                  handleRoute={handleLoginRoute}
                />
              }
            >
              {/* Route for logging into an account: /guest/login */}
              <Route index element={<GuestLogin />} />

              {/* Route for logging into an account: /guest/login */}
              <Route path="forgot-password" element={<GuestForgotPassword />} />
            </Route>

            {/* Route for resetting password: /guest/forgot/password */}
            <Route
              path="register"
              element={
                <RequireCheckOutlet
                  check={checkComplete}
                  handleRoute={handleLoginRoute}
                />
              }
            >
              {/* Route for registering an account: /guest/register */}
              <Route index element={<GuestRegister />} />

              {/* Route for completing registration process: /guest/register/complete */}
              <Route path="complete" element={<GuestRegisterComplete />} />
            </Route>
          </Route>

          {/* All routes for users with subscriber role: /guest/register/complete */}
          <Route
            path="user"
            element={<RequireCheckOutlet check={handleCheckoutCheck} />}
          >
            <Route
              path="checkout"
              element={<UserCheckout authtoken={user.token} />}
            />
            <Route
              path="payment"
              element={<UserPayment authtoken={user.token} />}
            />
          </Route>
          <Route
            path="user"
            element={
              <RequireRoleOutlet
                role={Role.SUBSCRIBER}
                layout={<UserLayout />}
              />
            }
          >
            {/* Route for seeing user's history: /guest/register/complete */}
            <Route
              path="history"
              element={<UserHistory authtoken={user.token} />}
            />
            <Route path="password" element={<UserPassword />} />
            <Route
              path="wishlist"
              element={
                <UserWishlist
                  authtoken={user.token}
                  username={user.name}
                  location={location}
                  navigate={navigate}
                />
              }
            />
          </Route>

          {/* All routes for users with admin role: /guest/register/complete */}
          <Route
            path="admin"
            element={
              <RequireCheckOutlet
                role={Role.ADMIN}
                check={handleAdminCheck}
                layout={<AdminLayout />}
              />
            }
          >
            <Route
              path="dashboard"
              element={<AdminDashboard authtoken={user.token} />}
            />
            <Route
              path="categories"
              element={<AdminCategory authtoken={user.token} />}
            />
            <Route
              path="product"
              element={<RequireRoleOutlet role={Role.ADMIN} />}
            >
              <Route index element={<AdminProduct authtoken={user.token} />} />
              <Route
                path=":slug"
                element={<AdminEditProduct authtoken={user.token} />}
              />
            </Route>
            <Route
              path="products"
              element={<AdminProducts authtoken={user.token} />}
            />
            <Route
              path="coupons"
              element={<AdminManageCoupons authtoken={user.token} />}
            />
          </Route>

          {/* Catches all routes that don't exist: /guest/register/complete */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
