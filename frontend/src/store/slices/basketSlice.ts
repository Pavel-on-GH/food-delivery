import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface BasketItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  count: number;
}

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

export const loadUserBasket = createAsyncThunk<BasketItem[], string, { rejectValue: string }>(
  'basket/loadUserBasket',
  async (token, { rejectWithValue }) => {
    try {
      const basketRes = await axios.post(
        'http://localhost:4000/api/basket/get',
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const basketData = basketRes.data.basketData;
      const foodRes = await axios.get('http://localhost:4000/api/food/food-arr');
      const foodArr = foodRes.data.data;

      const fullBasket: BasketItem[] = Object.entries(basketData).map(([id, count]) => {
        const product = foodArr.find((p: any) => p._id === id);
        return {
          _id: id,
          title: product?.title || '',
          price: product?.price || 0,
          image: product?.image || '',
          count: Number(count),
        };
      });

      return fullBasket;
    } catch (err) {
      console.error('Ошибка загрузки корзины авторизованного пользователя', err);
      return rejectWithValue('Failed to load user basket');
    }
  },
);

export const loadGuestBasketFromStorage = createAsyncThunk<BasketItem[]>(
  'basket/loadGuestBasketFromStorage',
  async () => {
    const stored = localStorage.getItem('guestBasket');
    return stored ? JSON.parse(stored) : [];
  },
);

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    incrementItem(state, action: PayloadAction<Omit<BasketItem, 'count'>>) {
      const existing = state.items.find((item) => item._id === action.payload._id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.count -= 1;
        if (item.count <= 0) {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearBasket(state) {
      state.items = [];
    },
    setBasket(state, action: PayloadAction<BasketItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserBasket.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(loadGuestBasketFromStorage.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { incrementItem, decrementItem, removeItem, clearBasket, setBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
