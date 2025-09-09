import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: '',
  loading: false,
  error: null,
};

export const authUser = createAsyncThunk<
  string,
  { mode: 'login' | 'register'; data: { name?: string; email: string; password: string } },
  { rejectValue: string }
>('auth/authUser', async ({ mode, data }, { rejectWithValue }) => {
  try {
    const url = `http://localhost:4000/api/user/${mode}`;
    const res = await axios.post(url, data);

    if (res.data.success) {
      localStorage.setItem('token', res.data.token);
      return res.data.token;
    } else {
      return rejectWithValue(res.data.message || 'Unknown error');
    }
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Server error');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('guestBasket');
    },
    setTokenFromStorage: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Authentication failed';
      });
  },
});

export const { logout, setTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
