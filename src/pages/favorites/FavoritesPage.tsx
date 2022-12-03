import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PlaceCards from '../../components/place-cards/PlaceCards';
import { CardTypes } from '../../consts';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import { city } from '../../store/appSlice';
import { findCityByName } from '../../utils';

type FavoritesOffers = {
  [key: string]: Offer[];
}

function Favorites (): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.appReducer.favoriteOffers);
  const dispatch = useAppDispatch();

  const getFavoritesPlacesFromOffers = () => {
    const result: FavoritesOffers = {};
    favoriteOffers.forEach((offer) => {
      if (result?.[offer.city.name]?.length) {
        result[offer.city.name].push(offer);
      } else {
        result[offer.city.name] = [offer];
      }
    });
    return result;
  };
  const favoritesPlaces = getFavoritesPlacesFromOffers();

  return (
    <div className="page">
      <Header withNav isMainPage={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
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
        </div>
      </main>

      <Footer isMainPage={false}/>
    </div>
  );
}

export default Favorites;
