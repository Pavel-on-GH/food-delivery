import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    incrementItem(state, action: PayloadAction<Omit<BasketItem, 'count'>>) {
      const existingItem = state.items.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    decrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          state.items = state.items.filter((item) => item._id !== action.payload);
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearBasket(state) {
      state.items = [];
    },
  },
});

export const { incrementItem, decrementItem, removeItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
