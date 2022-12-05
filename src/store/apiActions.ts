import { APIRoute } from './../consts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { api } from '../services/api';

export const fetchOffers = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    const response = await api.get<Offer[]>(APIRoute.Offers);
    return response.data;
  }
);
