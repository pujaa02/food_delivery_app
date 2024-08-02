import { PrismaClient } from '@prisma/client';
import { driverdata, features, menudata, permissions, ratingdata, restaurantdata, rolePermissions, roles, usersdata } from '../resources/seedData';

const prisma = new PrismaClient();

async function main(): Promise<void> {
    for (const permission of permissions) {
        const isExist = await prisma.permission.findFirst({
            where: {
                permission_name: permission,
            },
        });
        if (isExist) continue;
        await prisma.permission.create({
            data: {
                permission_name: permission
            },
        });
    }

    for (const role of roles) {
        const isExist = await prisma.role.findFirst({
            where: {
                role_name: role,
            },
        });
        if (isExist) continue;
        await prisma.role.create({
            data: {
                role_name: role
            },
        });
    }

    for (const feature of features) {
        const isExist = await prisma.feature.findFirst({
            where: {
                feature_name: feature,
            },
        });
        if (isExist) continue;
        await prisma.feature.create({
            data: {
                feature_name: feature
            }
        });
    }
    for (const roleKey in rolePermissions) {
        const role = await prisma.role.findFirst({
            where: { role_name: roleKey },
        });
        if (!role) continue;
        for (const featureKey in rolePermissions[roleKey as keyof typeof rolePermissions]) {
            const feature = await prisma.feature.findUnique({
                where: { feature_name: featureKey },
            });
            if (!feature) continue;

            for (const _permission of rolePermissions[roleKey as keyof typeof rolePermissions][featureKey as keyof typeof rolePermissions[typeof roleKey]]) {
                const permission = await prisma.permission.findFirst(
                    {
                        where: { permission_name: _permission },
                    },
                );
                if (!permission) continue;
                const isExist = await prisma.role_permission_feature.findFirst({
                    where: {
                        role_id: role.id,
                        feature_id: feature.id,
                        permission_id: permission.id,
                    },
                });
                if (isExist) continue;

                await prisma.role_permission_feature.create({
                    data: {
                        role: { connect: { id: role.id } },
                        feature: { connect: { id: feature.id } },
                        permission: { connect: { id: permission.id } },
                    },
                });
            }
        }
    }
    for (const user of usersdata) {
        const isExist = await prisma.user.findFirst({
            where: {
                email: user.email,
            },
        });
        if (isExist) continue;
        await prisma.user.create({
            data: user
        });
    }

    for (const restaurant of restaurantdata) {
        const isExist = await prisma.restaurant.findFirst({
            where: {
                name: restaurant.name,
            },
        });
        if (isExist) continue;
        await prisma.restaurant.create({
            data: restaurant
        });
    }

    for (const item of menudata) {
        const isExist = await prisma.menu.findFirst({
            where: {
                item_name: item.item_name,
                restaurant_id: item.restaurant_id
            },
        });
        if (isExist) continue;
        await prisma.menu.create({
            data: item
        });
    }

    await prisma.driver.createMany({
        data: driverdata
    });

    await prisma.rating.createMany({
        data: ratingdata
    });
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });