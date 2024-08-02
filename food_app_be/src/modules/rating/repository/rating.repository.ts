import { prisma } from "../../..";
import { RatingAttributes } from "../types/rating.types";



export async function ratingAddQuery2(input: RatingAttributes) {
  return await prisma.rating.upsert({
    where: {
      user_id_menu_id: {
        user_id: Number(input.user_id),
        menu_id: Number(input.menu_id),
      }
    },
    update: {
      rating: Number(input.rating), content: input.content?.toString() || ''
    },
    create: {
      user_id: Number(input.user_id),
      menu_id: Number(input.menu_id),
      rating: Number(input.rating),
      content: input.content?.toString() || '',
    },
  })
}

export async function ratingFetchquery(): Promise<RatingAttributes[]> {
  return (await prisma.rating.findMany()) as RatingAttributes[];
}

export async function SelectRatingQuery() {
  return await prisma.rating.groupBy({
    by: ['menu_id'],
    _avg: {
      rating: true,
    },
  });
}