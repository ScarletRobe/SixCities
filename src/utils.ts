import { LOCATIONS } from './consts';
import { Offer, City } from './types/offer';
export const capitalizeWord = (text: string) => text[0].toUpperCase() + text.slice(1);

export const findOffersByCity = (city: string, offers: Offer[]): Offer[] | [] => (
  offers.filter((offer) => offer.city.name === city)
);

export const findFavoriteOffers = (offers: Offer[]) => (
  offers.filter((offer) => offer.isFavorite)
);

export const findCityByName = (cityName: string): City => {
  const city = LOCATIONS.find((loc) => loc.name === cityName);
  if (!city) {
    throw new Error('Unknown city name');
  }
  return city;
};
