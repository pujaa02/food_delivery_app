import { prisma } from "../../..";
import { stringNumObject } from "../../../common/types/common";
import { DriverAttributes } from "../types/driver.types";
import { Menu, OrderAttributes, orderStatus, State_cart } from "../types/order.types";


export const orderAddQuery = async (user_id: number, cartData: State_cart, address: string, phone: string) => {
  try {
    const result = await prisma.order.create({
      data: {
        user_id: user_id,
        address: address,
        phone: phone
      }
    });

    const driverdata: DriverAttributes[] = await prisma.driver.findMany();

    driverdata.map(async (obj: DriverAttributes) => {
      await prisma.notification.create({
        data: {
          order_id: result.id,
          driver_id: obj.id,
          message: "Order is created",
          isRead: false,
          isDeleted: false
        }
      });
    });

    (cartData.cart).map(async (obj: Menu) => {
      await prisma.order_product.create({
        data: {
          user_id: user_id,
          menu_id: obj.menu_id,
          total_item: obj.count,
          order_id: result.id
        }
      })
    })

    await prisma.payment.create({
      data: {
        order_id: result.id,
        payment_method: 'UPI',
        total_amount: (cartData.total) + ((cartData.totalItems) * 15),
        status: "success"
      }
    })

    return {
      success: true,
      message: "Successfully Order placed",
    };
  } catch (error) {
    return { success: false, message: "Error occured" };
  }
}

export const getorderData = async (user_id: number) => {
  try {


    const orderdata = await prisma.order.findMany({
      where: { user_id: user_id },
      select: {
        id: true,
        createdAt: true,
        payment: {
          select: {
            total_amount: true,
          },
        },
        order_product: {
          select: {
            menu_id: true,
            total_item: true,
            menu: {
              select: {
                item_name: true,
                price: true,
                image: true,

              }
            }
          },
        },
      },
    })

    const result = orderdata.map((item) => ({
      order_id: item.id,
      total_amount: item.payment[0].total_amount,
      item_name: item.order_product.map((t1) => t1.menu.item_name + (`(${t1.total_item})`)).join(' , '),
      date: item.createdAt
    }))

    const order_status = await prisma.delivery.findMany({});

    const finalresult: orderStatus[] = result.map((t1) => ({
      ...t1, ...order_status.find((t2) => t1.order_id === t2.order_id)
    }))

    return {
      finalresult,
      success: true,
      message: "Successfully get order Data",
    };
  } catch (error) {
    return { success: false, message: "Error occured" };
  }
}

export const deliverystatusUpdateQuery = async (order_id: number) => {
  try {
    await prisma.delivery.updateMany({
      where: {
        order_id: order_id
      },
      data: {
        delivery_status: "Success"
      }
    })
    return {
      success: true,
      message: "Successfully updated status",
    };
  } catch (error) {
    return { success: false, message: "Error occured" };
  }
}

export async function orderUpdateQuery(condition: stringNumObject, content: object): Promise<{ count: number }> {
  return (await prisma.order.updateMany({
    where: condition,
    data: content,
  })) as { count: number };
}

export async function orderFetchquery(condition: stringNumObject): Promise<OrderAttributes> {
  return (await prisma.order.findMany({ where: condition })) as OrderAttributes;
}
