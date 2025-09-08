import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAppSelector } from '../store/hooks';
import type { FoodListItem } from '../components/FoodCatalogItem/FoodCatalogItem.types';

interface BasketItem extends FoodListItem {
  count: number;
}

export const useLoadBasket = () => {
  const token = useAppSelector((state) => state.authReducer.token);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBasket = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  return { basketItems, loading, refetch: fetchBasket };
};
