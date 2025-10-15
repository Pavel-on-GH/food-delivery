import { useAppDispatch, useAppSelector } from '../store/hooks';
import { incrementItem, decrementItem, removeItem, clearBasket } from '../store/slices/basketSlice';
import axios from 'axios';

export const useBasketActions = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReducer.token);

  const addToBasket = async (item: {
    _id: string;
    title: string;
    price: number;
    image: string;
  }) => {
    dispatch(incrementItem(item));

    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/basket/add`,
          { itemId: item._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.error('Ошибка при добавлении в корзину', error);
      }
    }
  };

  const removeFromBasket = async (itemId: string) => {
    dispatch(decrementItem(itemId));

    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/basket/remove`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.error('Ошибка при уменьшении количества', error);
      }
    }
  };

  const deleteFromBasket = async (itemId: string) => {
    dispatch(removeItem(itemId));

    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/basket/delete`,
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.error('Ошибка при полном удалении товара', error);
      }
    }
  };

  const clearUserBasket = async () => {
    dispatch(clearBasket());

    if (token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/basket/clear`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.error('Ошибка при очистке корзины', error);
      }
    }
  };

  return {
    addToBasket,
    removeFromBasket,
    deleteFromBasket,
    clearUserBasket,
  };
};
