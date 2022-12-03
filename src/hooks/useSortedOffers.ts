import { useMemo } from 'react';
import { SortOptions } from '../consts';
import { Offer } from '../types/offer';

export const useSortedOffers = (activeSortOption: string, offers: Offer[]) => {
  const offersCopy = [...offers];

  const sortedOffers: Offer[] = useMemo(() => {
    switch (activeSortOption) {
      case SortOptions.Popular:
        return offersCopy;
      case SortOptions.HighToLow:
        return offersCopy.sort((a, b) => b.price - a.price);
      case SortOptions.LowToHigh:
        return offersCopy.sort((a, b) => a.price - b.price);
      case SortOptions.TopRated:
        return offersCopy.sort((a, b) => b.rating - a.rating);
      default:
        throw new Error('Unknown type of sort');
    }
  }, [activeSortOption, offers]);

  return sortedOffers;
};
