import { Offer } from './types/offer';
export const capitalizeWord = (text: string) => text[0].toUpperCase() + text.slice(1);

export const findOffersByCity = (city: string, offers: Offer[]): Offer[] | [] => (
  offers.filter((offer) => offer.city.name === city)
);

export const findFavoriteOffers = (offers: Offer[]) => (
  offers.filter((offer) => offer.isFavorite)
);
