import { Request, Response } from 'express';
import { getallmenuQuery, getallratingQuery, getallrestaurantQuery, getalluserQuery } from '../repository/admin.repository';
import generalResponse from '../../../common/helper/generalReponse';

const getuserdata = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.params.page);
        const search: string = req.params.search;

        const result = await getalluserQuery(page, search);
        return generalResponse(res, result, result?.message, result?.success, false, 200)
    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
};

const getrestaurantsdata = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.params.page);
        const search: string = req.params.search;
        const result = await getallrestaurantQuery(page, search);
        
        return generalResponse(res, result, result?.message, result?.success, false, 200)
    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
};

const getmenudata = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.params.page);
        const search: string = req.params.search;
        const result = await getallmenuQuery(page, search);
      
        return generalResponse(res, result, result?.message, result?.success, false, 200)
    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
};

const getratingsdata = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.params.page);
        const search: string = req.params.search;
     

        const result = await getallratingQuery(page, search);
        
        return generalResponse(res, result, result?.message, result?.success, false, 200)
    } catch (error) {
        return generalResponse(res, "", "error occured", false, false, 400);
    }
};
export default { getuserdata, getrestaurantsdata, getmenudata, getratingsdata };
