import { userModel } from '../models/userModel.js';

export const addToBasket = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let basketData = await userData.basketData;
    if (!basketData[req.body.itemId]) {
      basketData[req.body.itemId] = 1;
    } else {
      basketData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { basketData });
    res.json({ success: true, message: 'Товар добавлен в корзину' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка при добавлении товара' });
  }
};
export const removeFromBasket = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let basketData = userData.basketData;

    if (basketData[req.body.itemId]) {
      basketData[req.body.itemId] -= 1;

      if (basketData[req.body.itemId] <= 0) {
        delete basketData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.body.userId, { basketData });
    res.json({ success: true, message: 'Товар удалён из корзины' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка при удалении товара' });
  }
};
export const getBasket = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let basketData = await userData.basketData;
    console.log('getBasket: userData:', userData);
    console.log('getBasket: basketData:', userData?.basketData);
    res.json({ success: true, basketData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка получения корзины' });
  }
};
export const deleteFromBasket = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const basketData = userData.basketData;

    if (basketData[req.body.itemId]) {
      delete basketData[req.body.itemId];
    }

    await userModel.findByIdAndUpdate(req.body.userId, { basketData });

    res.json({ success: true, message: 'Товар полностью удалён из корзины' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка при полном удалении товара' });
  }
};
export const clearBasket = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.body.userId, { basketData: {} });

    res.json({ success: true, message: 'Корзина очищена' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка при очистке корзины' });
  }
};
