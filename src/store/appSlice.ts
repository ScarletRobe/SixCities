/* eslint-disable no-console */
import { checkAuth, fetchOffers, login, logout } from './apiActions';
import { AuthorizationStatus } from './../consts';
import { findFavoriteOffers, findOffersByCity } from './../utils';
import { Offer, City } from './../types/offer';
import { defaultCity } from '../consts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../types/localUser';

type InitialState = {
  city: City;
  allOffers: Offer[];
  offersByCity: Offer[];
  favoriteOffers: Offer[];
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  loadingError: string | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  city: defaultCity,
  allOffers: [],
  offersByCity: [],
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
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
    [checkAuth.fulfilled.type]: (state: InitialState, action: PayloadAction<UserData>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    },
    [checkAuth.rejected.type]: (state: InitialState, action: PayloadAction<null>) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = action.payload;
    },
    [login.fulfilled.type]: (state: InitialState, action: PayloadAction<UserData>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    },
    [login.rejected.type]: (state: InitialState, action: PayloadAction<null>) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = action.payload;
    },
    [logout.fulfilled.type]: (state: InitialState) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    },
  }
});

export const {city, allOffers, offersByCity, favoriteOffers, authorizationStatus} = appSlice.actions;

export default appSlice.reducer;
