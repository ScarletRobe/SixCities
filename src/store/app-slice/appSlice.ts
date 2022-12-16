import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultCity } from '../../consts';
import { City, Offer } from '../../types/offer';
import { findOffersByCity, findFavoriteOffers } from '../../utils';
import { fetchOffers } from '../apiActions';

type InitialState = {
  city: City;
  allOffers: Offer[];
  offersByCity: Offer[];
  favoriteOffers: Offer[];
  loadingError: string | null;
  isLoading: boolean;
};

const initialState: InitialState = {
  city: defaultCity,
  allOffers: [],
  offersByCity: [],
  favoriteOffers: [],
  loadingError: '',
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'data',
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
  },
  extraReducers: {
    [fetchOffers.pending.type]: (state: InitialState) => {
      state.loadingError = null;
      state.isLoading = true;
    },
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
  }
});

export const {city, allOffers, offersByCity, favoriteOffers} = appSlice.actions;

export default appSlice.reducer;
