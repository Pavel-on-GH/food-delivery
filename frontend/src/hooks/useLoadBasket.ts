import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import type { FoodListItem } from '../components/FoodCatalogItem/FoodCatalogItem.types';
import type { BasketItem } from '../store/slices/basketSlice';
import { clearBasket } from '../store/slices/basketSlice';

interface UseLoadBasketOptions {
  mergeGuestToServer?: boolean;
}

export const useLoadBasket = ({ mergeGuestToServer = false }: UseLoadBasketOptions = {}) => {
  const token = useAppSelector((state) => state.authReducer.token);
  const guestItems = useAppSelector((state) => state.basketReducer.items);
  const dispatch = useAppDispatch();

  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBasket = useCallback(async () => {
    setLoading(true);

    if (!token) {
      setBasketItems(guestItems);
      setLoading(false);
      return;
    }

    try {
      if (mergeGuestToServer && guestItems.length > 0) {
        for (const item of guestItems) {
          for (let i = 0; i < item.count; i++) {
            await axios.post(
              'http://localhost:4000/api/basket/add',
              { itemId: item._id },
              { headers: { Authorization: `Bearer ${token}` } },
            );
          }
        }
        dispatch(clearBasket());
      }

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
      const foodArr: FoodListItem[] = foodRes.data.data;

      const fullBasket = Object.entries(basketData)
        .map(([id, count]) => {
          const product = foodArr.find((item) => item._id === id);
          return product
            ? {
                ...product,
                count: Number(count),
              }
            : null;
        })
        .filter(Boolean) as BasketItem[];

      setBasketItems(fullBasket);
    } catch (err) {
      console.error('Ошибка при загрузке корзины', err);
      setBasketItems([]);
    } finally {
      setLoading(false);
    }
  }, [token, guestItems, mergeGuestToServer, dispatch]);

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  return { basketItems, loading, refetch: fetchBasket };
};
