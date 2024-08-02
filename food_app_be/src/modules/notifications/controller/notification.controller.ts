import { Request, Response } from 'express';
import generalResponse from '../../../common/helper/generalReponse';
import { acceptorderQuery, fetchNotifications, fetchorderData } from '../repository/notification.repository';

const fetchnotifications = async (req: Request, res: Response) => {
    try {
        const driver_id: number = Number(req.params.driver_id);
        const result = await fetchNotifications(driver_id);
        return generalResponse(res, result, result?.message, result?.success, false, 200)

    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
}

const showorderdata = async (req: Request, res: Response) => {
    try {
        const order_id: number = Number(req.params.order_id);
        const result = await fetchorderData(order_id);
        return generalResponse(res, result, result?.message, result?.success, false, 200)

    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
}

const acceptorder = async (req: Request, res: Response) => {
    try {
        const order_id: number = Number(req.params.order_id);
        const driver_id: number = Number(req.params.driver_id);
        const result = await acceptorderQuery(driver_id,order_id);
        return generalResponse(res, result, result?.message, result?.success, false, 200)
    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
}

export default { fetchnotifications, showorderdata, acceptorder }