import { APIRoute, AuthorizationStatus } from './../consts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { api } from '../services/api';
import { UserData } from '../types/localUser';
import { AuthData } from '../types/authData';
import { dropToken, saveToken } from '../services/token';

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

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async() => {
    try {
      await api.get(APIRoute.Login);
      return AuthorizationStatus.Auth;
    } catch (error) {
      return AuthorizationStatus.NoAuth;
    }
  }
);

export const login = createAsyncThunk<AuthorizationStatus, AuthData>(
  'user/login',
  async({login: email, password}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      return AuthorizationStatus.Auth;
    } catch (error) {
      return AuthorizationStatus.NoAuth;
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async() => {
    await api.delete(APIRoute.Logout);
    dropToken();
    return AuthorizationStatus.NoAuth;
  }
);
