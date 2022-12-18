import PropertyImages from './PropertyImages';
import { Offer } from '../../types/offer';
import Rating from '../UI/Rating';
import { capitalizeWord } from '../../utils';
import PropertyInsideList from './PropertyInsideList';
import HostProfile from '../host-profile/HostProfile';
import Reviews from '../reviews/Reviews';
import PlaceCards from '../place-cards/PlaceCards';
import { CardTypes } from '../../consts';
import Map from '../map/Map';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Spinner from '../UI/spinner/Spinner';

type PropertyCardProps = {
  offer: Offer;
}

function PropertyCard({offer}: PropertyCardProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<number | null>(offer.id);
  const {reviews, isReviewsLoading} = useAppSelector((state) => state.rootReducer.appData);
  const {nearOffers, isNearOffersLoading} = useAppSelector((state) => state.rootReducer.appData);

  const cardHoverHandler = (offerId: number | null) => {
    if (!offerId) {setActiveCardId(offer.id);}
    else {setActiveCardId(offerId);}
  };

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <PropertyImages images={offer.images} propertyType={offer.type}/>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              offer?.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
              <button className={`${offer.isFavorite ? 'property__bookmark-button property__bookmark-button--active' : 'property__bookmark-button'} button`} type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">{offer.isFavorite ? 'Add to bookmarks' : 'Remove from bookmarks'}</span>
              </button>
            </div>
            <div className="property__rating rating">
              <Rating rating={offer.rating} type='property' round={false}/>
              <span className="property__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {capitalizeWord(offer.type)}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <PropertyInsideList goods={offer.goods}/>
            </div>
            <HostProfile host={offer.host} description={offer.description} />
            {
              isReviewsLoading
                ? <Spinner />
                : <Reviews reviews={reviews}/>
            }
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Map
            offers={nearOffers}
            location={offer.location}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
            type='property'
          />
        </div>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          {
            isNearOffersLoading
              ? <Spinner />
              : <PlaceCards offers={nearOffers} cardType={CardTypes.Property} cardHoverHandler={cardHoverHandler}/>
          }
        </section>
      </div>
    </main>
  );
}

export default PropertyCard;
