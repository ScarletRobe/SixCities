import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts';
import { UserData } from '../../types/localUser';
import { checkAuth, login, logout } from '../apiActions';


type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  },
  extraReducers: {
    [checkAuth.fulfilled.type]: (state: InitialState, action: PayloadAction<UserData>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    },
    [checkAuth.rejected.type]: (state: InitialState) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    },
    [login.fulfilled.type]: (state: InitialState, action: PayloadAction<UserData>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userData = action.payload;
    },
    [login.rejected.type]: (state: InitialState) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    },
    [logout.fulfilled.type]: (state: InitialState) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    },
  }
});

export const {authorizationStatus} = userSlice.actions;

export default userSlice.reducer;
