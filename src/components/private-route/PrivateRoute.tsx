import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import LoadingPage from '../../pages/loading-page/LoadingPage';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}
const renderSwitch = (authorizationStatus: AuthorizationStatus, children: JSX.Element) => {
  switch (authorizationStatus) {
    case AuthorizationStatus.Unknown:
      return <LoadingPage />;
    case AuthorizationStatus.Auth:
      return children;
    case AuthorizationStatus.NoAuth:
      return <Navigate to={AppRoute.Login} />;
  }
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    renderSwitch(authorizationStatus, children)
  );
}

export default PrivateRoute;
