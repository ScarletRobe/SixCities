import { AuthorizationStatus } from './../consts';
// import { offers } from './../mocks/offers';
import { findFavoriteOffers, findOffersByCity } from './../utils';
import { Offer, City } from './../types/offer';
import { defaultCity } from '../consts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  city: City;
  allOffers: Offer[];
  offersByCity: Offer[];
  favoriteOffers: Offer[];
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  city: defaultCity,
  allOffers: [],
  offersByCity: findOffersByCity(defaultCity.name, []),
  favoriteOffers: findFavoriteOffers([]),
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    city: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.offersByCity = findOffersByCity(action.payload.name, state.allOffers);
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
    authorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },
});

export const {city, allOffers, offersByCity, favoriteOffers, authorizationStatus} = appSlice.actions;

export default appSlice.reducer;
