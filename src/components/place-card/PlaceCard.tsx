import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { capitalizeWord } from '../../utils';

type PlaceCardProps = {
  offer: Offer;
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
}}: PlaceCardProps): JSX.Element {
  return (
    <Link to={`/place/${id}`}>
      <article className="cities__card place-card">
        {
          isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={`${isFavorite ? 'place-card__bookmark-button--active' : 'place-card__bookmark-button'} button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{isFavorite ? 'Add to bookmarks' : 'Remove from bookmarks'}To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: Math.round(rating) * STAR_WIDTH}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <p>{title}</p>
          </h2>
          <p className="place-card__type">{capitalizeWord(type)}</p>
        </div>
      </article>
    </Link>
  );
}

export default PlaceCard;
