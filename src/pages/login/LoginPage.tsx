import { Link, Navigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import LoginForm from '../../components/login-form/LoginForm';
import { AuthorizationStatus, LOCATIONS } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { city } from '../../store/app-slice/appSlice';
import { findCityByName, getRandomPositiveInteger } from '../../utils';

function Login (): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.rootReducer.userData.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to='/' />;
  }

  const randomCity = LOCATIONS[getRandomPositiveInteger(0, LOCATIONS.length - 1)].name;

  return (
    <div className="page page--gray page--login">
      <Header withNav={false} isMainPage={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="/"
                onClick={() => {
                  dispatch(city(findCityByName(randomCity)));
                }}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
