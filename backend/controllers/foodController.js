import { foodModel } from '../models/foodModel.js';
import fs from 'fs';

export const addFoodItem = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    title: req.body.title,
    image: image_filename,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, message: 'Товар добавлен' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка добавления товара' });
  }
};

export const foodArr = async (req, res) => {
  try {
    const arr = await foodModel.find({});
    res.json({ success: true, data: arr });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка получения данных' });
  }
};

export const removeFoodItem = async (req, res) => {
  try {
    const item = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${item.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Товар успешно удалён' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Ошибка удаления данных' });
  }
};
