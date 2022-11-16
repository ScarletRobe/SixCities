import { Link } from 'react-router-dom';
import { CardTypes } from '../../consts';
import { Offer } from '../../types/offer';
import { capitalizeWord } from '../../utils';

type PlaceCardProps = {
  offer: Offer;
  cardType: CardTypes;
}

const STAR_WIDTH = 15;

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
cardType}: PlaceCardProps): JSX.Element {
  const styles = {
    [CardTypes.Main]: {
      width: 260,
      height: 200,
    },
    [CardTypes.Favorites]: {
      width: 150,
      height: 110,
    },
  };

  return (
    <Link to={`/place/${id}`} className={`${cardType}__card place-card`}>
      <article className={`${cardType}__card place-card`}>
        {
          isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
          <img className="place-card__image" src={previewImage} width={styles[cardType].width} height={styles[cardType].height} alt="Place" />
        </div>
        <div className={cardType === CardTypes.Main ? 'place-card__info' : 'favorites__card-info place-card__info'}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={`${isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active' : 'place-card__bookmark-button'} button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{isFavorite ? 'Add to bookmarks' : 'Remove from bookmarks'}</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: Math.round(rating) * STAR_WIDTH}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <span>{title}</span>
          </h2>
          <p className="place-card__type">{capitalizeWord(type)}</p>
        </div>
      </article>
    </Link>
  );
}

export default PlaceCard;
