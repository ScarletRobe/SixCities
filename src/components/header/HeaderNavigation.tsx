import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/apiActions';

function HeaderNavigation() {
  const favoriteOffers = useAppSelector((state) => state.appReducer.favoriteOffers);
  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
            <span className="header__favorite-count">{favoriteOffers.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <div className="header__nav-link">
            <span
              className="header__signout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Sign out
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
