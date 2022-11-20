import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PlaceCards from '../../components/place-cards/PlaceCards';
import { CardTypes } from '../../consts';
import { offers } from '../../mocks/offers';
import { Offer } from '../../types/offer';

type FavoritesOffers = {
  [key: string]: Offer[];
}

function Favorites (): JSX.Element {
  const getFavoritesPlacesFromOffers = () => {
    const result: FavoritesOffers = {};
    offers.forEach((offer) => {
      if (offer.isFavorite) {
        if (result?.[offer.city.name]?.length) {
          result[offer.city.name].push(offer);
        } else {
          result[offer.city.name] = [offer];
        }
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

              {Object.keys(favoritesPlaces).map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <PlaceCards cardType={CardTypes.Favorites} offers={favoritesPlaces[city]}/>
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
