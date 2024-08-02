import { Request, Response } from 'express';
import { Menudata, AvgRating, Menu, Rating, MenuItem, RestaurantRating, RestaurantAverage, MenuData } from '../types/home.types';
import { MenuAttributes } from '../../menu/types/menu.types';
import { fetchallmenuquery, menuFetchQuery } from '../../menu/repository/menu.repository';
import { SelectRatingQuery } from '../../rating/repository/rating.repository';

const fetchallmenu = async (req: Request, res: Response) => {
    try {
        const menudata: Menudata[] = await fetchallmenuquery({ deletedAt: null });
        const ratingdata: AvgRating[] = await SelectRatingQuery();
        const menu_Data: Menu[] = menudata.map(item => ({
            item_name: item.item_name,
            price: item.price,
            image: item.image,
            name: item.restaurant.name,
            menu_id: item.id,
            restaurant_id: item.restaurant.id,
        }))
        const rating_Data: Rating[] = ratingdata.map(rating => ({
            menu_id: rating.menu_id,
            avgrate: rating._avg.rating ? rating._avg.rating.toFixed(1) : null
        }));
        const result: Menu[] = menu_Data.map((t1) => ({
            ...t1,
            ...rating_Data.find((t2) => t2.menu_id === t1.menu_id),
        }));
        res.status(200).send({ message: 'success', result: result });
    } catch (error) {
        return res.status(500).send({ message: 'failed' });
    }
};


const toprestaurant = async (req: Request, res: Response) => {
    try {
        const ratingdata: AvgRating[] = await SelectRatingQuery();
        const rating_Data: Rating[] = ratingdata.map(rating => ({
            menu_id: rating.menu_id,
            avgrate: rating._avg.rating ? rating._avg.rating.toFixed(1) : null
        }));
        const menudata: Menudata[] = await fetchallmenuquery({ deletedAt: null });
        const data: MenuItem[] = menudata.map((t1) => ({
            ...t1,
            ...rating_Data.find((t2) => t2.menu_id === t1.id),
        }));

        const groupedByRestaurant: { [key: number]: RestaurantRating } = data.reduce((acc, item) => {
            const restaurantId: number = item.restaurant?.id;
            if (restaurantId) {
                if (!acc[restaurantId]) {
                    acc[restaurantId] = { user_id: item.restaurant.user_id, name: item.restaurant.name, image: item.restaurant.image, ratings: [] };
                }
                if (item.avgrate) {
                    acc[restaurantId].ratings.push(parseFloat(item.avgrate));
                }
            }
            return acc;
        }, {} as { [key: number]: RestaurantRating });

        const restaurantAverages: RestaurantAverage[] = Object.entries(groupedByRestaurant).map(([id, { user_id, name, image, ratings }]) => {
            const averageRating: number | null = ratings.length > 0 ? ratings.reduce((sum, rate) => sum + rate, 0) / ratings.length : null;
            return {
                restaurant_id: parseInt(id),
                user_id: user_id,
                restaurant_name: name,
                restaurant_image: image,
                average_rating: averageRating
            };
        });
        res.status(200).send({ message: 'success', data: restaurantAverages });
    } catch (error) {
        return res.status(500).send({ message: 'failed' });
    }
};

const fetchmenuitems = async (req: Request, res: Response) => {
    const item: string = req.params.item;
    try {
        const ratingdata: AvgRating[] = await SelectRatingQuery();
        const menudata: Menudata[] = await fetchallmenuquery({ item_name: item, deletedAt: null });
        const menu_Data: Menu[] = menudata.map(item => ({
            item_name: item.item_name,
            price: item.price,
            image: item.image,
            name: item.restaurant.name,
            menu_id: item.id,
            restaurant_id: item.restaurant.id,
        }))
        const rating_Data: Rating[] = ratingdata.map(rating => ({
            menu_id: rating.menu_id,
            avgrate: rating._avg.rating ? rating._avg.rating.toFixed(1) : null
        }));
        const result: Menu[] = menu_Data.map((t1) => ({
            ...t1,
            ...rating_Data.find((t2) => t2.menu_id === t1.menu_id),
        }));
        res.status(200).send({ message: 'success', result: result });
    } catch (error) {
        return res.status(500).send({ message: 'failed' });
    }
};

const getrestaurantallmenu = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    try {
        const ratingdata: AvgRating[] = await SelectRatingQuery();

        const rating_Data: Rating[] = ratingdata.map(rating => ({
            menu_id: rating.menu_id,
            avgrate: rating._avg.rating ? rating._avg.rating.toFixed(1) : null
        }));

        const menudata: MenuAttributes[] = await menuFetchQuery({ restaurant_id: id, deletedAt: null });

        const result: MenuData[] = menudata.map((t1) => ({
            ...t1,
            ...rating_Data.find((t2) => t2.menu_id === t1.id),
        }));
        res.status(200).send({ message: 'success', result: result });
    } catch (error) {
        return res.status(500).send({ message: 'failed' });
    }
};

export default { fetchallmenu, toprestaurant, fetchmenuitems, getrestaurantallmenu };