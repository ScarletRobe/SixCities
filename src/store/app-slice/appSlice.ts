import { fetchOffer } from './../apiActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultCity } from '../../consts';
import { City, Offer } from '../../types/offer';
import { findOffersByCity, findFavoriteOffers } from '../../utils';
import { fetchOffers } from '../apiActions';

type InitialState = {
  city: City;
  allOffers: Offer[];
  allOffersLoadingError: string | null;
  isAllOffersLoading: boolean;
  offersByCity: Offer[];
  favoriteOffers: Offer[];
  currentOffer: Offer | null;
  currentOfferLoadingError: boolean | null;
  isCurrentOfferLoading: boolean;
};

const initialState: InitialState = {
  city: defaultCity,
  allOffers: [],
  allOffersLoadingError: null,
  isAllOffersLoading: false,
  offersByCity: [],
  favoriteOffers: [],
  currentOffer: null,
  currentOfferLoadingError: null,
  isCurrentOfferLoading: false,
};

export const appSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    city: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.offersByCity = findOffersByCity(action.payload.name, state.allOffers);
    },
    offersByCity: (state, action: PayloadAction<Offer[]>) => {
      state.offersByCity = action.payload;
    },
    favoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload;
    },
  },
  extraReducers: {
    [fetchOffers.pending.type]: (state: InitialState) => {
      state.allOffersLoadingError = null;
      state.isAllOffersLoading = true;
    },
    [fetchOffers.fulfilled.type]: (state: InitialState, action: PayloadAction<Offer[]>) => {
      state.allOffers = action.payload;
      state.offersByCity = findOffersByCity(state.city.name, action.payload);
      state.favoriteOffers = findFavoriteOffers(action.payload);
      state.isAllOffersLoading = false;
    },
    [fetchOffers.rejected.type]: (state: InitialState, action: PayloadAction<string>) => {
      state.allOffersLoadingError = action.payload;
      state.isAllOffersLoading = false;
    },
    [fetchOffer.pending.type]: (state: InitialState) => {
      state.isCurrentOfferLoading = true;
      state.currentOfferLoadingError = null;
    },
    [fetchOffer.fulfilled.type]: (state: InitialState, action: PayloadAction<Offer>) => {
      state.isCurrentOfferLoading = false;
      state.currentOffer = action.payload;
    },
    [fetchOffer.rejected.type]: (state: InitialState) => {
      state.isCurrentOfferLoading = false;
      state.currentOfferLoadingError = true;
    },
  }
});

export const {city, offersByCity, favoriteOffers} = appSlice.actions;

export default appSlice.reducer;
