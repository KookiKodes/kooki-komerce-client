import { useEffect, useState } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { Navigate, useLocation, useOutlet, Outlet } from 'react-router-dom';
import Error404 from '../../routes/404';
const Loading = () => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      position="fixed"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="xl" color="yellow.400" />
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export const RequireRoleComp = ({
  children,
  role,
  user,
  loading,
  handleRoute,
}) => {
  const location = useLocation();
  const outlet = useOutlet();

  if (loading) return <Loading />;

  if (outlet) return <Outlet />;

  if (user && user.role !== role) {
    if (handleRoute) {
      return handleRoute({ user, role, Navigate, location });
    }
    return <Navigate to={-1} state={{ from: location }} />;
  }
  return children;
};

export const RequireRole = connect(mapStateToProps)(RequireRoleComp);

const RequireCheckComp = ({
  children,
  loading,
  user,
  role,
  check,
  handleRoute,
}) => {
  const location = useLocation();
  const outlet = useOutlet();

  if (loading) return <Loading />;

  if (outlet) return <Outlet />;

  if (!check({ user, role })) {
    if (handleRoute) {
      return handleRoute({ user, role, Navigate, location });
    }
    return <Navigate to={-1} state={{ from: location }} />;
  }
  return children;
};

export const RequireCheck = connect(mapStateToProps)(RequireCheckComp);

const RequireRoleOutletComp = ({ user, role, handleRoute, layout }) => {
  const location = useLocation();
  const outlet = useOutlet();

  if (user.loading) return <Loading />;

  if (!user || user.role !== role) {
    if (handleRoute) {
      return handleRoute({ user, role, Navigate, location });
    }
    if (outlet.props.value.outlet) {
      if (layout) return layout;
      return <Outlet />;
    }
    return <Navigate to={-1} state={location} />;
  }

  if (layout) return layout;
  if (outlet) return <Outlet />;

  return <Error404 />;
};

export const RequireRoleOutlet = connect(mapStateToProps)(
  RequireRoleOutletComp
);

const LogicTemplate = ({
  location,
  role,
  user,
  loading,
  handleRoute,
  checkPassed,
  layout,
  outlet,
}) => {
  if (loading) return <Loading />;
  if (!checkPassed) {
    if (handleRoute) {
      return handleRoute({ user, role, Navigate, location });
    }
    return <Navigate to={-1} />;
  }
  if (layout) return layout;
  if (outlet) return <Outlet user={user} />;
  return <Error404 />;
};

const RequireCheckOutletComp = ({ check, user, role, handleRoute, layout }) => {
  const location = useLocation();
  const outlet = useOutlet();
  const [state, setState] = useState({ passed: false, loading: true });

  useEffect(() => {
    if (
      user &&
      check.constructor.name === 'AsyncFunction' &&
      !state.passed &&
      !user.loading
    ) {
      check({ user, role, location })
        .then(passed => {
          setState({ passed, loading: false });
        })
        .catch(error => setState({ passed: false, loading: true }));
    }
  }, [user, check, location, role, state.passed]);

  if (check.constructor.name === 'AsyncFunction') {
    return (
      <LogicTemplate
        loading={state.loading || user.loading}
        user={user}
        role={role}
        location={location}
        handleRoute={handleRoute}
        layout={layout}
        outlet={outlet}
        checkPassed={state.passed}
      />
    );
  }

  return (
    <LogicTemplate
      user={user}
      role={role}
      checkPassed={check({ user, role, location })}
      loading={user.loading}
      handleRoute={handleRoute}
      layout={layout}
      outlet={outlet}
      location={location}
    />
  );
};

export const RequireCheckOutlet = connect(mapStateToProps)(
  RequireCheckOutletComp
);
