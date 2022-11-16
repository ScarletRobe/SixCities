import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/PlaceCard';

type PlaceCardsProps = {
  offers: Offer[];
}

function PlaceCards({offers}: PlaceCardsProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}

export default PlaceCards;
