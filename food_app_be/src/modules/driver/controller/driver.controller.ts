import { Request, Response } from 'express';
import { driverfetchQuery, driverUpdateQuery, fetchdashboardQuery } from '../repository/driver.repository';
import generalResponse from '../../../common/helper/generalReponse';


const removedriver = async (req: Request, res: Response) => {
  const driverid: number = Number(req.params.driver_id);
  try {
    await driverUpdateQuery({ id: driverid }, { deletedAt: new Date() });
    res.status(200).send({ message: 'success' });
  } catch (error) {
    return res.status(500).send({ message: 'failed' });
  }
};

const fetchdriver = async (req: Request, res: Response) => {
  const user_id: number = Number(req.params.user_id);
  try {
    const result = await driverfetchQuery(user_id)
    return generalResponse(res, result, result?.message, result?.success, false, 200)
  } catch (error) {
    return generalResponse(res, "", "error occured", false, false, 400);
  }
};

const fetchdashboarddata = async (req: Request, res: Response) => {
  const driver_id: number = Number(req.params.driver_id);
  try {
    const result = await fetchdashboardQuery(driver_id)
    return generalResponse(res, result, result?.message, result?.success, false, 200);
  } catch (error) {
    return generalResponse(res, "", "error occured", false, false, 400);
  }
};

export default { fetchdriver, removedriver, fetchdashboarddata };
