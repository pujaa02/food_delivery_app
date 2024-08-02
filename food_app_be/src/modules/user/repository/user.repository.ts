import { prisma } from "../../..";
import { stringNumObject } from "../../../common/types/common";
import { UserAttributes } from "../types/user";


export async function userAddQuery(input: UserAttributes): Promise<UserAttributes> {
    return (await prisma.user.create({
        data: {
            fname: input.fname?.toString() || "",
            lname: input.lname?.toString() || "",
            email: input.email?.toString() || "",
            phone: input.phone?.toString() || "",
            gender: input.gender?.toString() || "",
            bd: input.bd || "",
            password: input.password?.toString() || "",
            access_key: input.access_key?.toString(),
            role_id: Number(input.role_id),
            city: input.city?.toString() || "",
            state: input.state?.toString() || "",
            street: input.street?.toString() || "",
            pincode: input.pincode?.toString() || "",
        }
    })) as UserAttributes
}

export async function checkUserexist(input: string) {
    return (await prisma.user.findUnique({
        where: {
            email: input
        }
    }))
}

export async function findUser(input: number) {
    return (await prisma.user.findUnique({
        where: {
            id: input
        }
    }))
}


export async function userFetchquery(condition: stringNumObject): Promise<UserAttributes[]> {
    return (await prisma.user.findMany({ where: condition })) as UserAttributes[];
}


export async function userUpdateQuery(condition: stringNumObject, content: object): Promise<{ count: number }> {
    return (await prisma.user.updateMany({
        where: condition,
        data: content,
    })) as { count: number };
}

