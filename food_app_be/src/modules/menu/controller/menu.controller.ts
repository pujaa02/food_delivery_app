import { Request, Response } from 'express';
import { MenuAttributes, SheetData } from '../types/menu.types';
import { RestaurantResult } from '../../restaurant/types/restaurant.types';
import { menuAddQuery, menuUpdateQuery, getRestaurant, menuFetchQuery, addallmenubulkdata } from '../repository/menu.repository';
import generalResponse from '../../../common/helper/generalReponse';

const addmenu = async (req: Request, res: Response) => {
  try {
    const filename: string | undefined = req.file?.filename;
    await menuAddQuery({
      restaurant_id: Number(req.params.restaurant_id),
      item_name: req.body.item_name,
      price: req.body.price,
      image: 'uploads/' + filename,
    });
    res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const updatemenu = async (req: Request, res: Response) => {
  const menuid: number = Number(req.params.menu_id);
  const filename: string | undefined = req.file?.filename;
  let img: string | undefined = 'uploads/' + filename;
  if (filename === undefined) {
    img = req.body.image;
  }
  try {
    await menuUpdateQuery(
      { id: menuid },
      { item_name: req.body.item_name, price: Number(req.body.price), image: img, },
    );
    res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const removemenu = async (req: Request, res: Response) => {
  const menuid: number = Number(req.params.menu_id);
  try {
    await menuUpdateQuery({ id: menuid }, { deletedAt: new Date() });
    res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};
const findrestaurantwithmenu = async (req: Request, res: Response) => {
  const name: string = req.params.name;
  try {
    const result: RestaurantResult | null = await getRestaurant(name);
    if (result === null) {
      res.status(200).send({ message: 'null' });
    } else {
      const menuresult: MenuAttributes[] = await menuFetchQuery({ restaurant_id: Number(result.id) });
      res.status(200).send({ message: 'success', data: menuresult });
    }
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const fetchmenudata = async (req: Request, res: Response) => {
  const menu_id: number = Number(req.params.menu_id);

  try {
    const result: MenuAttributes[] = await menuFetchQuery({ id: menu_id, deletedAt: null });
    res.status(200).send({ message: 'success', result: result[0] });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const fetchmenubyrestaurant = async (req: Request, res: Response) => {
  try {
    const result: MenuAttributes[] = await menuFetchQuery({ deletedAt: null, restaurant_id: Number(req.params.restaurant_id) });
    res.status(200).send({ message: 'success', result: result });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};



const addbulkdata = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const finaldata = data.map((obj: SheetData) => ({ ...obj, restaurant_id: Number(req.params.restaurant_id) }))
    const result = await addallmenubulkdata(finaldata);
    return generalResponse(res, result, result?.message, result?.success, false, 200)
  } catch (error) {
    return generalResponse(res, "", "error occured", false, false, 400);
  }
}

export default { addmenu, updatemenu, removemenu, findrestaurantwithmenu, fetchmenudata, fetchmenubyrestaurant, addbulkdata };
