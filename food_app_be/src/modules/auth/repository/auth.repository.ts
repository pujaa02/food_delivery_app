import { prisma } from "../../..";
import { UserAttributes } from "../../user/types/user";

export const getalldata = async (user: UserAttributes) => {
    try {

        const rolePermissionfeature = await prisma.role_permission_feature.findMany({
            where: {
                role_id: user.role_id
            },
            include: {
                feature: {
                    select: {
                        feature_name: true,
                        id: true
                    }
                },
                permission: {
                    select: {
                        permission_name: true,
                        id: true,
                    }
                },
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        })

        const role = await prisma.role.findMany({});
        const permission = await prisma.permission.findMany({});
        return {
            rolePermissionfeature,
            role, permission,
            success: true,
            message: "Successfully get all users",

        };

    } catch (error) {
        return { success: false, message: "Error occured" };
    }
}