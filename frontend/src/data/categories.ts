import type { FoodCategory } from '../components/FoodCategories/FoodCategories.types';
import soups from '../assets/images/food-categories/soups.png';
import salads from '../assets/images/food-categories/salads.png';
import snacks from '../assets/images/food-categories/snacks.png';
import sushi from '../assets/images/food-categories/sushi.png';
import drinks from '../assets/images/food-categories/coffee.png';
import desserts from '../assets/images/food-categories/desserts.png';

export const categories_list: FoodCategory[] = [
  { title: 'Супы', image: soups },
  { title: 'Салаты', image: salads },
  { title: 'Закуски', image: snacks },
  { title: 'Суши и роллы', image: sushi },
  { title: 'Напитки', image: drinks },
  { title: 'Десерты', image: desserts },
];
