import { useState } from 'react';
import { CardTypes, SortOptions } from '../../consts';
import { useAppSelector } from '../../hooks/redux';
import { useSortedOffers } from '../../hooks/useSortedOffers';
import Map from '../map/Map';
import PlaceCards from '../place-cards/PlaceCards';
import Sort from '../sort/Sort';

function OffersSection() {
  const city = useAppSelector((state) => state.appReducer.city);
  const offers = useAppSelector((state) => state.appReducer.offersByCity);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeSortOption, setActiveSortOption] = useState<string>(SortOptions.Popular);
  const sortedOffers = useSortedOffers(activeSortOption, offers);

  const cardHoverHandler = (offerId: number | null) => setActiveCardId(offerId);


  return (
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
  );
}

export default OffersSection;
