import { prisma } from "../../..";
import { DriverNotification, OrderData, Ordermodal } from "../types/notification.types";


export const fetchNotifications = async (driver_id: number) => {
    try {
        // const driver_notification: DriverNotification[] = await prisma.notification.findMany({
        //     where: {
        //         driver_id: driver_id,
        //         deletedAt: null
        //     },
        //     select: {
        //         id: true,
        //         order_id: true,
        //         driver_id: true,
        //         message: true,
        //         isRead: true,
        //         isDeleted: true,
        //         createdAt: true,
        //         deletedAt: true,
        //         order: {
        //             select: {
        //                 user_id: true,
        //                 address: true,
        //                 phone: true,
        //             }
        //         }
        //     }
        // })

        const driver_notification: DriverNotification[] = await prisma.notification.findMany({
            where: {
                driver_id: driver_id,
                deletedAt: null
            },
            include: {
                order: {
                    select: {
                        user_id: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        })
        return {
            driver_notification,
            success: true,
            message: "Successfully Order placed",
        };
    } catch (error) {
        return { success: false, message: "Error occured" };
    }
}

export const fetchorderData = async (order_id: number) => {
    try {
        const orderdata: OrderData[] = await prisma.order_product.findMany({
            where: { order_id: order_id },
            select: {
                menu_id: true,
                total_item: true,
                menu: {
                    select: {
                        item_name: true,
                        restaurant_id: true,
                        restaurant: {
                            select: {
                                name: true,
                                phone: true,
                                address: true,
                            }
                        }
                    }
                }
            },
        })

        const result: Ordermodal[] = orderdata.map((item) => ({
            menu_id: item.menu_id,
            count: item.total_item,
            item_name: item.menu.item_name,
            resta_id: item.menu.restaurant_id,
            restaurant: item.menu.restaurant.name,
            restaurant_address: item.menu.restaurant.address,
            restaurant_phone: item.menu.restaurant.phone
        }))
        return {
            result,
            success: true,
            message: "Successfully Order data get",
        };
    } catch (error) {
        return { success: false, message: "Error occured" };
    }
}


export const acceptorderQuery = async (driver_id: number, order_id: number) => {
    try {
        await prisma.notification.updateMany({
            where: {
                driver_id: driver_id,
                order_id: order_id
            },
            data: {
                isRead: true
            }
        })
        await prisma.notification.updateMany({
            where: {
                order_id: order_id
            },
            data: {
                isDeleted: true
            }
        })

        await prisma.delivery.create({
            data: {
                order_id: order_id,
                driver_id: driver_id,
                delivery_status: "Pending",
            }
        })
        return {
            success: true,
            message: "Successfully accepted",
        };
    } catch (error) {
        return { success: false, message: "Error occured" };
    }
}
