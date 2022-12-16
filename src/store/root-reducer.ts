import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './app-slice/appSlice';
import userSlice from './user-slice/userSlice';

export const rootReducer = combineReducers({
  appData: appSlice,
  userData: userSlice,
});
