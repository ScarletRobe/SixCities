import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../components/header/Header';
import Locations from '../../components/locations/Locations';
import Map from '../../components/map/Map';
import PlaceCards from '../../components/place-cards/PlaceCards';
import Sort from '../../components/sort/Sort';
import { CardTypes, SortOptions } from '../../consts';
import { useAppSelector } from '../../hooks/redux';
import { Offer } from '../../types/offer';

function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state.appReducer.city);
  const offers = useAppSelector((state) => state.appReducer.offersByCity);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeSortOption, setActiveSortOption] = useState<string>(SortOptions.Popular);
  const [sortedOffers, setSortedOffers] = useState<Offer[]>(offers);

  useEffect(() => {
    const result: Offer[] = [...offers];
    switch (activeSortOption) {
      case SortOptions.Popular:
        break;
      case SortOptions.HighToLow:
        result.sort((a, b) => b.price - a.price);
        break;
      case SortOptions.LowToHigh:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortOptions.TopRated:
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        throw new Error('Unknown type of sort');
    }
    setSortedOffers(result);
  }, [activeSortOption, offers]);

  const cardHoverHandler = (offerId: number | null) => setActiveCardId(offerId);

  return (
    <div className="page page--gray page--main">
      <Header
        withNav
        isMainPage
      />

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
              <Sort
                activeSortOption={activeSortOption}
                setActiveSortOption={setActiveSortOption}
              />
              <PlaceCards
                cardType={CardTypes.Main}
                offers={sortedOffers}
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
