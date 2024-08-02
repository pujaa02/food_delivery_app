import { prisma } from "../../..";
import { Menu, Rating, Restaurant, SearchConditionMenu, SearchConditionRating, SearchConditionRestaurant, SearchConditionUser, User } from "../types/admin.types";

export const getalluserQuery = async (page: number, search: string) => {
    try {
        const recordsperPage: number = 5;
        const start: number = page * recordsperPage - recordsperPage;
        let users: User[];
        if (search === "nothing") {
            users = await prisma.user.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null,
                    NOT: { role_id: 1 }
                },
            });
        } else {
            const searchConditions: SearchConditionUser[] = [
                {
                    fname: {
                        contains: search,
                        mode: 'insensitive'
                    },
                },
                {
                    lname: {
                        contains: search,
                        mode: 'insensitive'
                    },
                },
                {
                    email: {
                        contains: search,
                        mode: 'insensitive'
                    },
                },
            ]
            const searchAsNumber: number = Number(search);
            if (!isNaN(searchAsNumber)) {
                searchConditions.push({
                    role_id: searchAsNumber
                });
            }

            users = await prisma.user.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null,
                    NOT: { role_id: 1 },
                    OR: searchConditions
                },
            });
        }
        const totalUsers = await prisma.user.findMany({
            where: {
                deletedAt: null,
                NOT: { role_id: 1 },
            },
            select: {
                id: true,
            },
        });
        const totalPages: number = Math.ceil(totalUsers.length / recordsperPage);
        return {
            users,
            success: true,
            message: "Successfully get all users",
            totalPages
        };
    } catch (err) {
        return { success: false, message: "Error occured" };
    }
};


export const getallrestaurantQuery = async (page: number, search: string) => {
    try {
        const recordsperPage: number = 5;
        const start: number = page * recordsperPage - recordsperPage;
        let restaurants: Restaurant[];
        if (search === "nothing") {
            restaurants = await prisma.restaurant.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null
                },
            });
        } else {
            const searchConditions: SearchConditionRestaurant[] = [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    },
                },
                {
                    phone: {
                        contains: search,
                        mode: 'insensitive'
                    },
                }
            ];

            const searchAsNumber: number = Number(search);
            if (!isNaN(searchAsNumber)) {
                searchConditions.push({
                    user_id: searchAsNumber
                });
            }

            restaurants = await prisma.restaurant.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null,
                    OR: searchConditions,
                },
            });
        }

        const totalRestaurants = await prisma.restaurant.findMany({
            where: {
                deletedAt: null
            },
            select: {
                id: true,
            },
        });
        const totalPages: number = Math.ceil(totalRestaurants.length / recordsperPage);
        return {
            restaurants,
            success: true,
            message: "Successfully get all restaurants",
            totalPages
        };
    } catch (err) {
        return { success: false, message: "Error occured" };
    }
}

export const getallmenuQuery = async (page: number, search: string) => {
    try {
        const recordsperPage: number = 5;
        const start: number = page * recordsperPage - recordsperPage;
        let menu: Menu[];
        if (search === "nothing") {
            menu = await prisma.menu.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null,
                },
            });
        } else {
            const searchConditions: SearchConditionMenu[] = [
                {
                    item_name: {
                        contains: search,
                        mode: 'insensitive'
                    },
                },
            ]
            const searchAsNumber: number = Number(search);
            if (!isNaN(searchAsNumber)) {
                searchConditions.push({
                    restaurant_id: searchAsNumber,
                    price: searchAsNumber
                });
            }
            menu = await prisma.menu.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null,
                    OR: searchConditions
                },
            });
        }

        const totalmenuitems = await prisma.menu.findMany({
            where: {
                deletedAt: null
            },
            select: {
                id: true,
            },
        });
        const totalPages: number = Math.ceil(totalmenuitems.length / recordsperPage);
        return {
            menu,
            success: true,
            message: "Successfully get all menu items",
            totalPages
        };
    } catch (err) {
        return { success: false, message: "Error occured" };
    }
}

export const getallratingQuery = async (page: number, search: string) => {
    try {
        const recordsperPage: number = 5;
        const start: number = page * recordsperPage - recordsperPage;
        let rating: Rating[];
        if (search === "nothing") {
            rating = await prisma.rating.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null
                },
            });
        } else {
            const searchConditions: SearchConditionRating[] = [
                {
                    content: {
                        contains: search,
                        mode: 'insensitive'
                    },
                },
            ]
            const searchAsNumber: number = Number(search);
            if (!isNaN(searchAsNumber)) {
                searchConditions.push({
                    user_id: searchAsNumber,
                    menu_id: searchAsNumber,
                    rating: searchAsNumber
                });
            }
            rating = await prisma.rating.findMany({
                take: recordsperPage,
                skip: start,
                where: {
                    deletedAt: null,
                    OR: searchConditions
                },
            });
        }

        const totalraters = await prisma.rating.findMany({
            where: {
                deletedAt: null
            },
            select: {
                id: true,
            },
        });
        const totalPages = Math.ceil(totalraters.length / recordsperPage);
        return {
            rating,
            success: true,
            message: "Successfully get all ratings",
            totalPages
        };
    } catch (err) {
        return { success: false, message: "Error occured" };
    }
}