import { Request, Response } from 'express';
import { RestaurantAttributes } from '../types/restaurant.types';
import { menuUpdateQuery } from '../../menu/repository/menu.repository';
import { restaurantAddQuery, restaurantUpdateQuery, restaurantFetchQuery } from '../repository/restaurant.repository';


const addrestaurant = async (req: Request, res: Response) => {
  const user_id: number = Number(req.params.user_id);
  try {
    const filename: string | undefined = req.file?.filename;
    const result: RestaurantAttributes = await restaurantAddQuery({
      user_id: user_id,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      image: 'uploads/' + filename,
    });
    res.status(200).send({ message: 'restaurant added Successfully', restaurant_id: result.id });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const updaterestaurant = async (req: Request, res: Response) => {
  const resid: number = Number(req.params.restaurant_id);
  const user_id: number = Number(req.params.user_id);
  const filename: string | undefined = req.file?.filename;
  let img: string = 'uploads/' + filename;
  if (filename === undefined) {
    img = req.body.image;
  }
  try {
    await restaurantUpdateQuery(
      { id: resid },
      { user_id: user_id, name: req.body.name, phone: req.body.phone, address: req.body.address, image: img, },
    );
    res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const removerestaurant = async (req: Request, res: Response) => {
  const res_id: number = Number(req.params.restaurant_id);
  try {
    await menuUpdateQuery({ id: res_id }, { deletedAt: new Date() });
    await restaurantUpdateQuery({ id: res_id }, { deletedAt: new Date() });
    res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const getrestaurantdata = async (req: Request, res: Response) => {
  const user_id: number = Number(req.params.user_id);
  try {
    const result: RestaurantAttributes = await restaurantFetchQuery({ user_id: user_id, deletedAt: null });
    res.status(200).send({ message: 'success', result: result });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};




export default { addrestaurant, updaterestaurant, removerestaurant, getrestaurantdata };
