import { Link } from 'react-router-dom';
import { CardTypes } from '../../consts';
import { Offer } from '../../types/offer';
import { capitalizeWord } from '../../utils';
import AddToFavoritesBtn from '../UI/add-to-favorites/AddToFavoritesBtn';
import Rating from '../UI/Rating';

type PlaceCardProps = {
  offer: Offer;
  cardType: CardTypes;
  cardHoverHandler?: (offerId: number | null) => void;
}

type Style = {
  [key: string]: {
    width: number;
    height: number;
    className: string;
  };
}

function PlaceCard({offer: {
  previewImage,
  price,
  isFavorite,
  isPremium,
  rating,
  title,
  id,
  type,
},
cardType,
cardHoverHandler}: PlaceCardProps): JSX.Element {
  const Styles: Style = {
    [CardTypes.Main]: {
      width: 260,
      height: 200,
      className: 'cities',
    },
    [CardTypes.Property]: {
      width: 260,
      height: 200,
      className: 'near-places',
    },
    [CardTypes.Favorites]: {
      width: 150,
      height: 110,
      className: 'favorites',
    },
    [CardTypes.MarkerPopup]: {
      width: 0,
      height: 0,
      className: 'marker',
    }
  };

  const className = Styles[cardType].className;

  const cardElement = (
    <article className={`${className}__card place-card`}>
      {
        isPremium &&
          <div className={`place-card__mark ${className}-card__mark`}>
            <span>Premium</span>
          </div>
      }
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <img className="place-card__image" src={previewImage} width={Styles[cardType].width} height={Styles[cardType].height} alt="Place" />
      </div>
      <div className={className === CardTypes.Main ? 'place-card__info' : 'favorites__card-info place-card__info'}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {cardType !== CardTypes.MarkerPopup &&
            <AddToFavoritesBtn id={id} btnType={CardTypes.Main} isFavorite={isFavorite} />}
        </div>
        <div className="place-card__rating rating">
          <Rating rating={rating} type='place-card' />
        </div>
        <h2 className="place-card__name">
          <span>{title}</span>
        </h2>
        <p className="place-card__type">{capitalizeWord(type)}</p>
      </div>
    </article>
  );

  if (cardType === CardTypes.MarkerPopup) {
    return cardElement;
  } else {
    return (
      <Link
        to={`/place/${id}`}
        className={`${className}__card place-card`}
        onMouseEnter={() => cardHoverHandler?.(id)}
        onMouseLeave={() => cardHoverHandler?.(null)}
      >
        {cardElement}
      </Link>
    );
  }

}

export default PlaceCard;
