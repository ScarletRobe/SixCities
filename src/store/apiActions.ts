import { APIRoute } from './../consts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { api } from '../services/api';
import { UserData } from '../types/localUser';
import { AuthData } from '../types/authData';
import { dropToken, saveToken } from '../services/token';
import { Comment } from '../types/comment';

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

export const fetchOffer = createAsyncThunk<Offer, string>(
  'data/fetchOffer',
  async (id, thunkAPI) => {
    try {
      const response = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      return response.data;
    } catch (error) {
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

export const checkAuth = createAsyncThunk<UserData | null>(
  'user/checkAuth',
  async(_, thunkAPI) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
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
      saveToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async() => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
