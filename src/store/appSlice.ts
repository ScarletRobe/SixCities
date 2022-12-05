import { fetchOffers } from './apiActions';
import { AuthorizationStatus } from './../consts';
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
  loadingError: string | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  city: defaultCity,
  allOffers: [],
  offersByCity: [],
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  loadingError: '',
  isLoading: false,
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
  extraReducers: {
    [fetchOffers.fulfilled.type]: (state: InitialState, action: PayloadAction<Offer[]>) => {
      state.allOffers = action.payload;
      state.offersByCity = findOffersByCity(state.city.name, action.payload);
      state.favoriteOffers = findFavoriteOffers(action.payload);
      state.loadingError = null;
      state.isLoading = false;
    },
    [fetchOffers.rejected.type]: (state: InitialState, action: PayloadAction<string>) => {
      state.loadingError = action.payload;
      state.isLoading = false;
    },
    [fetchOffers.pending.type]: (state: InitialState) => {
      state.loadingError = null;
      state.isLoading = true;
    },
  }
});

export const {city, allOffers, offersByCity, favoriteOffers, authorizationStatus} = appSlice.actions;

export default appSlice.reducer;
