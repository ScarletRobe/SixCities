import { offers } from './../mocks/offers';
import { findFavoriteOffers, findOffersByCity } from './../utils';
import { Offer, City } from './../types/offer';
import { defaultCity } from '../consts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  city: City;
  allOffers: Offer[];
  offersByCity: Offer[];
  favoriteOffers: Offer[];
}

const initialState: InitialState = {
  city: defaultCity,
  allOffers: offers,
  offersByCity: findOffersByCity(defaultCity.name, offers),
  favoriteOffers: findFavoriteOffers(offers),
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    city: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.offersByCity = findOffersByCity(action.payload.name, offers);
    },
    allOffers: (state, action: PayloadAction<Offer[]>) => {
      state.allOffers = action.payload;
    },
    offersByCity: (state, action: PayloadAction<Offer[]>) => {
      state.offersByCity = action.payload;
    },
    favoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    },
  },
});

export const {city, allOffers, offersByCity, favoriteOffers} = appSlice.actions;

export default appSlice.reducer;
