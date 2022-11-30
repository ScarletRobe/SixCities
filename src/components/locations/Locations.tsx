import { Link } from 'react-router-dom';
import { LOCATIONS } from '../../consts';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { city, offersByCity } from '../../store/appSlice';
import { City } from '../../types/offer';
import { findOffersByCity } from '../../utils';

function Locations(): JSX.Element {
  const currentLocation = useAppSelector((state) => state.appReducer.city);
  const offers = useAppSelector((state) => state.appReducer.allOffers);
  const dispatch = useAppDispatch();

  const clickHandler = (location: City) => {
    dispatch(city(location));
    dispatch(offersByCity(findOffersByCity(location.name, offers)));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {LOCATIONS.map((location) => (
          <li key={location.name} className="locations__item">
            <Link
              className={
                location.name === currentLocation.name
                  ? 'locations__item-link tabs__item tabs__item--active'
                  : 'locations__item-link tabs__item'
              }
              to="/"
              onClick={() => clickHandler(location)}
            >
              <span>{location.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Locations;
