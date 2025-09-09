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

    if (!res.data.success) {
      return rejectWithValue(res.data.message || 'Unknown error');
    }

    const token = res.data.token;
    localStorage.setItem('token', token);

    const guestBasket = localStorage.getItem('guest_basket');
    if (guestBasket) {
      const parsedBasket = JSON.parse(guestBasket) as { _id: string; count: number }[];

      for (const item of parsedBasket) {
        for (let i = 0; i < item.count; i++) {
          await axios.post(
            'http://localhost:4000/api/basket/add',
            { itemId: item._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
      }

      localStorage.removeItem('guest_basket');
    }

    return token;
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
