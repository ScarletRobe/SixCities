import { useState } from 'react';
import Header from '../../components/header/Header';
import Locations from '../../components/locations/Locations';
import Map from '../../components/map/Map';
import PlaceCards from '../../components/place-cards/PlaceCards';
import { CardTypes } from '../../consts';
import { useAppSelector } from '../../hooks/redux';

function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state.appReducer.city);
  const offers = useAppSelector((state) => state.appReducer.offersByCity);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const cardHoverHandler = (offerId: number | null) => setActiveCardId(offerId);

  return (
    <div className="page page--gray page--main">
      <Header withNav isMainPage/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlaceCards
                cardType={CardTypes.Main}
                offers={offers}
                cardHoverHandler={cardHoverHandler}
              />
            </section>
            <div className="cities__right-section">
              <Map
                location={city.location}
                activeCardId={activeCardId}
                type='cities'
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
