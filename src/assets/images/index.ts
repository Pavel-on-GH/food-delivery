import soups from './food-categories/soups.png';
import salads from './food-categories/salads.png';
import snacks from './food-categories/snacks.png';
import sushi from './food-categories/sushi.png';
import drinks from './food-categories/coffee.png';
import desserts from './food-categories/desserts.png';

interface FoodCategory {
  title: string;
  image: string;
}

export { default as logo } from './logo.svg';
export { default as basket } from './basket.svg';

export const categories_list: FoodCategory[] = [
  { title: 'Супы', image: soups },
  { title: 'Салаты', image: salads },
  { title: 'Закуски', image: snacks },
  { title: 'Суши и роллы', image: sushi },
  { title: 'Напитки', image: drinks },
  { title: 'Десерты', image: desserts },
];
