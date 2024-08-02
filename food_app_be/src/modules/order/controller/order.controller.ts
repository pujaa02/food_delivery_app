import { Request, Response } from 'express';
import { OrderAttributes, State_cart } from '../types/order.types';
import { deliverystatusUpdateQuery, getorderData, orderAddQuery, orderFetchquery, orderUpdateQuery } from '../repository/order.repository';
import generalResponse from '../../../common/helper/generalReponse';

const addorder = async (req: Request, res: Response) => {
  try {
    const user_id: number = Number(req.params.user_id);
    const cartData: State_cart = req.body.cart;
    const address: string = req.body.address;
    const phone: string = req.body.phone;
    const result = await orderAddQuery(user_id, cartData, address, phone);
    return generalResponse(res, result, result?.message, result?.success, false, 200)

  } catch (error) {
    return generalResponse(res, "", "error occured", false, false, 400);
  }
};

const getorderdetail = async (req: Request, res: Response) => {
  try {
    const user_id: number = Number(req.params.user_id);
    const result = await getorderData(user_id);
    return generalResponse(res, result, result?.message, result?.success, false, 200)

  } catch (error) {
    return generalResponse(res, "", "error occured", false, false, 400);
  }
}


const cancelorder = async (req: Request, res: Response) => {
  try {
    const result: OrderAttributes = await orderFetchquery({
      user_id: Number(req.params.user_id),
      restaurant_id: Number(req.params.restaurant_id),
      id: Number(req.params.order_id),
    });
    if (result) {
      await orderUpdateQuery({ id: Number(req.params.order_id) }, { deletedAt: new Date() });
      res.status(200).send({ message: 'success' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const updateorderstatus = async (req: Request, res: Response) => {
  try {
    const order_id: number = Number(req.params.order_id)
    const result = await deliverystatusUpdateQuery(order_id);
    return generalResponse(res, result, result?.message, result?.success, false, 200)

  } catch (error) {
    return generalResponse(res, "", "error occured", false, false, 400);
  }
};


export default { addorder, cancelorder, getorderdetail, updateorderstatus };

