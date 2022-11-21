import { CardTypes } from '../../consts';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/PlaceCard';

type PlaceCardsProps = {
  offers: Offer[];
  cardType: CardTypes;
}

type Class = {
  [key: string]: string;
}

function PlaceCards({offers, cardType}: PlaceCardsProps) {
  const Classes: Class = {
    [CardTypes.Main]: 'cities__places-list places__list tabs__content',
    [CardTypes.Favorites]: 'favorites__places',
    [CardTypes.Property]: 'near-places__list places__list'
  };

  return (
    <div className={Classes[cardType]}>
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
