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

export const loadUserBasket = createAsyncThunk<BasketItem[], string>(
  'basket/loadUserBasket',
  async (token) => {
    const basketRes = await axios.post(
      'http://localhost:4000/api/basket/get',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const basketData = basketRes.data.basketData;

    const foodRes = await axios.get('http://localhost:4000/api/food/food-arr');
    const foodArr = foodRes.data.data;

    return Object.entries(basketData).map(([id, count]) => {
      const product = foodArr.find((p: any) => p._id === id);
      return {
        _id: id,
        title: product?.title || '',
        price: product?.price || 0,
        image: product?.image || '',
        count: Number(count),
      };
    });
  },
);

export const loadGuestBasketFromStorage = createAsyncThunk<BasketItem[]>(
  'basket/loadGuestBasketFromStorage',
  async () => {
    const stored = localStorage.getItem('guestBasket');
    return stored ? JSON.parse(stored) : [];
  },
);

const saveGuestBasketToStorage = (items: BasketItem[]) => {
  const raw = localStorage.getItem('guestBasket');
  const parsed = raw ? JSON.parse(raw) : [];

  const isSame = JSON.stringify(parsed) === JSON.stringify(items);

  if (!isSame) {
    localStorage.setItem('guestBasket', JSON.stringify(items));
  }
};

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
      saveGuestBasketToStorage(state.items);
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.count -= 1;
        if (item.count <= 0) {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }
      saveGuestBasketToStorage(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveGuestBasketToStorage(state.items);
    },
    clearBasket(state) {
      state.items = [];
      localStorage.removeItem('guestBasket');
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

export const persistGuestBasket = (items: BasketItem[], token: string) => {
  if (!token) {
    saveGuestBasketToStorage(items);
  }
};

export default basketSlice.reducer;
