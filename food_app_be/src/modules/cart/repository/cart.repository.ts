
import { prisma } from '../../..';
import { stringNumObject } from '../../../common/types/common';
import { CartAttribute } from '../types/cart.types';

export async function cartaddupdate(input: CartAttribute): Promise<CartAttribute> {
  return (await prisma.cart.upsert({
    where: {
      user_id_menu_id: {
        user_id: Number(input.user_id),
        menu_id: Number(input.menu_id)
      }
    },
    update: {
      count: input.count,
      deletedAt: null,
    },
    create: {
      user_id: input.user_id,
      menu_id: input.menu_id,
      count: input.count,
    },
  })) as CartAttribute;
}

export async function cartUpdateQuery(condition: stringNumObject, content: object): Promise<{ count: number }> {
  return (await prisma.cart.updateMany({
    where: condition,
    data: content,
  })) as { count: number };
}

export async function fetchCartData(input: number) {
  return (await prisma.cart.findMany({
    where: {
      user_id: input,
      deletedAt: null,
    }
  }))
}

