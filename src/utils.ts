/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOCATIONS } from './consts';
import { Offer, City } from './types/offer';

export const getRandomPositiveInteger = (min: number, max = 0) => {
  if (max < 0 || min < 0 || max % 1 !== 0 || min % 1 !== 0) {
    throw new Error('Задан некорректный диапазон');
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
};

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

export const debounce = function <T extends (...args: any[]) => void>(
  cb: T,
  timeoutDelay = 250,
  immediate = true
) {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function <U>(this: U, ...rest: Parameters<typeof cb>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    const executeLater = function() {
      timeoutId = null;
      cb.apply(context, rest);
    };

    const callNow = immediate && !timeoutId;
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId);
    }

    if (callNow) {
      cb.apply(context, rest);

      timeoutId = setTimeout(
        () => {
          timeoutId = null;
        },
        timeoutDelay);
    } else {
      timeoutId = setTimeout(executeLater, timeoutDelay);
    }
  };
};
