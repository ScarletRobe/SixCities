import { APIRoute } from './../consts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { api } from '../services/api';
import { UserData } from '../types/localUser';
import { AuthData } from '../types/authData';
import { dropToken, saveToken } from '../services/token';
import { Comment } from '../types/comment';
import { NewReviewData } from '../types/newReviewData';
import { toast } from 'react-toastify';
import { OfferData } from '../types/offerData';


export const fetchOffers = createAsyncThunk(
  'data/fetchOffers',
  async (_, thunkAPI) => {
    try {
      const response = await api.get<Offer[]>(APIRoute.Offers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить предложения. Попробуйте позже');
    }
  }
);

export const clearPropertyError = createAsyncThunk(
  'data/clearPropertyError',
  (_, thunkAPI) => thunkAPI.fulfillWithValue((null))
);

export const fetchOffer = createAsyncThunk<Offer, string>(
  'data/fetchOffer',
  async (id, thunkAPI) => {
    try {
      const response = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      return response.data;
    } catch (error) {
      setTimeout(
        () => { thunkAPI.dispatch(clearPropertyError()); },
        2000,
      );
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchNearOffers = createAsyncThunk<Offer[], string>(
  'data/fetchNearOffers',
  async (id, thunkAPI) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const setFavoritesStatus = createAsyncThunk<{offer: Offer; withChangeCurrentOffer: boolean}, OfferData>(
  'data/setFavoritesStatus',
  async ({id, isFavorite, withChangeCurrentOffer}) => {
    const status = isFavorite ? 0 : 1;
    const response = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
    return {offer: response.data, withChangeCurrentOffer};
  },
);

export const fetchFavorites = createAsyncThunk<Offer[]>(
  'data/fetchFavorites',
  async () => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Comment[], string>(
  'data/fetchComments',
  async (id, thunkAPI) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Reviews}/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const sendReview = createAsyncThunk<Comment[] | void, NewReviewData>(
  'data/sendReview',
  async ({id, reviewText, reviewRating}) => {
    try {
      const {data} = await api.post<Comment[]>(`${APIRoute.Reviews}/${id}`, {comment: reviewText, rating: reviewRating});
      return data;
    } catch (error) {
      toast.error('Error adding Comment');
      throw error;
    }
  },
);

export const checkAuth = createAsyncThunk<UserData | null>(
  'user/checkAuth',
  async(_, thunkAPI) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      thunkAPI.dispatch(fetchFavorites());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const login = createAsyncThunk<UserData | null, AuthData>(
  'user/login',
  async({login: email, password}, thunkAPI) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      thunkAPI.dispatch(fetchFavorites());
      saveToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async(_, thunkAPI) => {
    await api.delete(APIRoute.Logout);
    thunkAPI.dispatch(fetchOffers());
    dropToken();
  }
);
