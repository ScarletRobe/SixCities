import { fetchNearOffers, fetchOffer, fetchReviews, sendReview, setFavoritesStatus, fetchFavorites, logout, clearPropertyError } from './../apiActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultCity } from '../../consts';
import { City, Offer } from '../../types/offer';
import { fetchOffers } from '../apiActions';
import { Comment } from '../../types/comment';

type InitialState = {
  city: City;
  allOffers: Offer[];
  allOffersLoadingError: string | null;
  isAllOffersLoading: boolean;
  favoriteOffers: Offer[];
  favoriteOffersLoadingError: boolean | null;
  isFavoriteOffersLoading: boolean;
  currentOffer: Offer | null;
  currentOfferLoadingError: boolean | null;
  isCurrentOfferLoading: boolean;
  nearOffers: Offer[];
  isNearOffersLoading: boolean;
  reviews: Comment[];
  isReviewsLoading: boolean;
  isReviewSending: boolean;
};

const initialState: InitialState = {
  city: defaultCity,
  allOffers: [],
  allOffersLoadingError: null,
  isAllOffersLoading: false,
  favoriteOffers: [],
  favoriteOffersLoadingError: null,
  isFavoriteOffersLoading: false,
  currentOffer: null,
  currentOfferLoadingError: null,
  isCurrentOfferLoading: false,
  nearOffers: [],
  isNearOffersLoading: false,
  reviews: [],
  isReviewsLoading: false,
  isReviewSending: false,
};

export const appSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    city: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
  extraReducers: {
    [fetchOffers.pending.type]: (state: InitialState) => {
      state.allOffersLoadingError = null;
      state.isAllOffersLoading = true;
    },
    [fetchOffers.fulfilled.type]: (state: InitialState, action: PayloadAction<Offer[]>) => {
      state.allOffers = action.payload;
      state.isAllOffersLoading = false;
    },
    [fetchOffers.rejected.type]: (state: InitialState, action: PayloadAction<string>) => {
      state.allOffersLoadingError = action.payload;
      state.isAllOffersLoading = false;
    },
    [fetchFavorites.pending.type]: (state: InitialState) => {
      state.isFavoriteOffersLoading = true;
      state.favoriteOffersLoadingError = null;
    },
    [fetchFavorites.fulfilled.type]: (state: InitialState, action: PayloadAction<Offer[]>) => {
      state.isFavoriteOffersLoading = false;
      state.favoriteOffers = action.payload;
    },
    [fetchFavorites.rejected.type]: (state: InitialState) => {
      state.isFavoriteOffersLoading = false;
      state.favoriteOffersLoadingError = true;
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
    [clearPropertyError.fulfilled.type]: (state: InitialState) => {
      state.currentOfferLoadingError = null;
    },
    [fetchNearOffers.pending.type]: (state: InitialState) => {
      state.isNearOffersLoading = true;
    },
    [fetchNearOffers.fulfilled.type]: (state: InitialState, action: PayloadAction<Offer[]>) => {
      state.isNearOffersLoading = false;
      state.nearOffers = action.payload;
    },
    [fetchNearOffers.rejected.type]: (state: InitialState) => {
      state.isNearOffersLoading = false;
      state.nearOffers = [];
    },
    [fetchReviews.pending.type]: (state: InitialState) => {
      state.isReviewsLoading = true;
    },
    [fetchReviews.fulfilled.type]: (state: InitialState, action: PayloadAction<Comment[]>) => {
      state.isReviewsLoading = false;
      state.reviews = action.payload;
    },
    [fetchReviews.rejected.type]: (state: InitialState) => {
      state.isReviewsLoading = false;
    },
    [sendReview.pending.type]: (state: InitialState) => {
      state.isReviewSending = true;
    },
    [sendReview.fulfilled.type]: (state: InitialState, action: PayloadAction<Comment[]>) => {
      state.isReviewSending = false;
      state.reviews = action.payload;
    },
    [sendReview.rejected.type]: (state: InitialState) => {
      state.isReviewSending = false;
    },
    [setFavoritesStatus.fulfilled.type]: (state: InitialState, {payload: {offer, withChangeCurrentOffer}}: PayloadAction<{offer: Offer; withChangeCurrentOffer: boolean}>) => {
      if (withChangeCurrentOffer) {
        state.currentOffer = offer;
      }
      state.allOffers[state.allOffers.findIndex((off) => off.id === offer.id)] = offer;
      state.nearOffers[state.nearOffers.findIndex((off) => off.id === offer.id)] = offer;

      if (offer.isFavorite) {
        state.favoriteOffers.push(offer);
      } else {
        state.favoriteOffers = state.favoriteOffers.filter((off) => off.id !== offer.id);
      }
    },
    [logout.fulfilled.type]: (state: InitialState) => {
      state.favoriteOffers = [];
    },
  }
});

export const {city} = appSlice.actions;

export default appSlice.reducer;
