import { prisma } from "../../..";
import { stringNumObject } from "../../../common/types/common";
import { RestaurantAttributes } from "../types/restaurant.types";


export async function restaurantAddQuery(input: RestaurantAttributes): Promise<RestaurantAttributes> {
  return (await prisma.restaurant.create({
    data: {
      user_id: Number(input.user_id),
      name: input.name?.toString() || '',
      phone: input.phone?.toString() || '',
      image: input.image?.toString() || '',
      address: input.address?.toString() || '',
    },
  })) as RestaurantAttributes;
}

export async function restaurantUpdateQuery(condition: stringNumObject, content: object): Promise<{ count: number }> {
  return (await prisma.restaurant.updateMany({
    where: condition,
    data: content,
  })) as { count: number };
}

export async function restaurantFetchQuery(condition: stringNumObject): Promise<RestaurantAttributes> {
  return (await prisma.restaurant.findMany({ where: condition })) as RestaurantAttributes;
}

export async function fetchallRestaurant(): Promise<RestaurantAttributes[]> {
  return (await prisma.restaurant.findMany()) as RestaurantAttributes[];
}