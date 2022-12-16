import { Link } from 'react-router-dom';
import { CardTypes } from '../../consts';
import { useAppDispatch } from '../../hooks/redux';
import { FavoritesOffers } from '../../pages/favorites/FavoritesPage';
import { city } from '../../store/app-slice/appSlice';
import { findCityByName } from '../../utils';
import PlaceCards from '../place-cards/PlaceCards';

type FavoritesCardProps = {
  favoritesPlaces : FavoritesOffers;
}

function FavoritesCard ({favoritesPlaces}: FavoritesCardProps) {
  const dispatch = useAppDispatch();

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">

        {Object.keys(favoritesPlaces).map((town) => (
          <li key={town} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link
                  className="locations__item-link"
                  to="/"
                  onClick={() => dispatch(city(findCityByName(town)))}
                >
                  <span>{town}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              <PlaceCards cardType={CardTypes.Favorites} offers={favoritesPlaces[town]}/>
            </div>
          </li>
        ))}

      </ul>
    </section>
  );
}

export default FavoritesCard;
