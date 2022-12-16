import { AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks/redux';
import AuthNavList from './AuthNavList';
import NoAuthNavList from './NoAuthNavList';

function HeaderNavigation() {
  const authorizationStatus = useAppSelector((state) => state.rootReducer.userData.authorizationStatus);

  return (
    <nav className="header__nav">
      {
        authorizationStatus === AuthorizationStatus.Auth
          ? <AuthNavList />
          : <NoAuthNavList />
      }
    </nav>
  );
}

export default HeaderNavigation;
