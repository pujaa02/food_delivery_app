import { prisma } from "../../..";
import { ChatAttributes } from "../types/chat.types";




export async function chataddQuery(input: ChatAttributes): Promise<ChatAttributes> {
    return (await prisma.chat.create({
        data: {
            sender_id: Number(input.sender_id),
            receiver_id: Number(input.receiver_id),
            message: (input.message)
        },
    })) as ChatAttributes;
}


export async function chatgetQuery() {
    return (await prisma.chat.findMany({
        where: {
            deletedAt: null
        }
    }))
}