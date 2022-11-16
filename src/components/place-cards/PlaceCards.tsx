import { CardTypes } from '../../consts';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/PlaceCard';

type PlaceCardsProps = {
  offers: Offer[];
  cardType: CardTypes;
}

function PlaceCards({offers, cardType}: PlaceCardsProps) {
  return (
    <div className={cardType === CardTypes.Main ? 'cities__places-list places__list tabs__content' : 'favorites__places'}>
      {offers.map((offer) => (
        <PlaceCard
          cardType={cardType}
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}

export default PlaceCards;
