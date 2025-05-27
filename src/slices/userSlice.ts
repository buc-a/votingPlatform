import { IUser} from '../utils/constants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TRegisterData, registerUserApi,  loginUserApi} from '../utils/api'
import { setCookie} from '../utils/cookie';
export interface UserState {
  login: string | null;
  isAuthorized: boolean;
  error: string | null;
}

const initialState: UserState = {
  login: null,
  isAuthorized: false,
  error: null
};

const registerUserThunk = createAsyncThunk(
  'user/register',
  (registerData: TRegisterData) => registerUserApi(registerData)
);

const loginUserThunk = createAsyncThunk(
  'user/login',
  (loginData: TRegisterData) => loginUserApi(loginData)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.login = null;
      state.isAuthorized = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        console.log("pending")
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, { payload }) => {
        console.log("fulfil")
        state.login = payload.username;
        state.isAuthorized = true;
        state.error = null;
        setCookie('accessToken', payload.access_token)
        
      })
      .addCase(registerUserThunk.rejected, (state, { payload }) => {
        console.log("rejected")
        state.error = payload as string;
        state.isAuthorized = false;
      })
      .addCase(loginUserThunk.pending, (state) => {
        console.log("pending")
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        console.log("fulfil")
        state.login = payload.username;
        state.isAuthorized = true;
        state.error = null;
        setCookie('accessToken', payload.access_token)
        
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        console.log("rejected")
        state.error = payload as string;
        state.isAuthorized = false;
      });
  },
    selectors: {
        
        getUserSelector: (state) => state
  },
})

export const {
  getUserSelector
} = userSlice.selectors;

export default userSlice.reducer;
export { registerUserThunk, loginUserThunk };
export const { clearUser } = userSlice.actions;