import { useMemo, useState } from 'react';
import { CardTypes, SortOptions } from '../../consts';
import { useAppSelector } from '../../hooks/redux';
import { useSortedOffers } from '../../hooks/useSortedOffers';
import { debounce } from '../../utils';
import Map from '../map/Map';
import PlaceCards from '../place-cards/PlaceCards';
import Sort from '../sort/Sort';

function OffersSection() {
  const city = useAppSelector((state) => state.rootReducer.appData.city);
  const offers = useAppSelector((state) => state.rootReducer.appData.offersByCity);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [activeSortOption, setActiveSortOption] = useState<string>(SortOptions.Popular);
  const sortedOffers = useSortedOffers(activeSortOption, offers);

  const cardHoverHandler = (offerId: number | null) => {
    if (offerId) {
      setActiveCardId(offerId);
    }
  };

  const debouncedCardHoverHandler = debounce(cardHoverHandler);

  const location = useMemo(() => {
    const currentOffer = offers.find((offer) => offer.id === activeCardId);
    if (!currentOffer) {
      return city.location;
    } else {
      return currentOffer.location;
    }
  }, [activeCardId, city, offers]);

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
            cardHoverHandler={debouncedCardHoverHandler}
          />
        </section>
        <div className="cities__right-section">
          <Map
            location={location}
            activeCardId={activeCardId}
            type='cities'
          />
        </div>
      </div>
    </div>
  );
}

export default OffersSection;
