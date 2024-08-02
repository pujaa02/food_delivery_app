import { prisma } from "../../..";
import { stringNumObject } from "../../../common/types/common";
import { DashboardData, DriverAttributes } from "../types/driver.types";



export async function driverAddQuery(input: number | undefined): Promise<DriverAttributes> {
  return (await prisma.driver.create({
    data: {
      user_id: Number(input)
    },
  })) as DriverAttributes;
}

export async function driverUpdateQuery(condition: stringNumObject, content: object): Promise<{ count: number }> {
  return (await prisma.driver.updateMany({
    where: condition,
    data: content,
  })) as { count: number };
}


export const driverfetchQuery = async (user_id: number) => {
  try {
    const result = await prisma.driver.findFirst({
      where: {
        user_id: user_id
      }
    })
    return {
      result,
      success: true,
      message: "Successfully Order placed",
    };
  } catch (error) {
    return { success: false, message: "Error occured" };
  }
}

export const fetchdashboardQuery = async (driver_id: number) => {
  try {
    const result: DashboardData[] = await prisma.delivery.findMany({
      where: {
        driver_id: driver_id
      }
    })
    return {
      result,
      success: true,
      message: "Successfully Order placed",
    };
  } catch (error) {
    return { success: false, message: "Error occured" };
  }
}