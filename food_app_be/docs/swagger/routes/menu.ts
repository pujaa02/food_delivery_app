module.exports = {
    '/menu/addmenu/{restaurant_id}': {
        post: {
            tags: ['Menu'],
            summary: 'Add menu details',
            produces: ['json'],
            parameters: [{
                in: 'path',
                name: 'restaurant_id',
                required: true,
                type: 'integer',
                description: 'restaurant_id',
            },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                item_name: { type: 'string' },
                                price: { type: 'number' },
                            },
                            required: ['item_name', 'price',],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Add menu details',
                },
            },
        },
    },
    '/menu/updatemenu/{menu_id}': {
        post: {
            tags: ['Menu'],
            summary: 'update menu',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'menu_id',
                    required: true,
                    type: 'integer',
                    description: 'menu Id',
                },
            ],
            responses: {
                200: {
                    description: 'update menu',
                },
            },
        },
    },
    '/menu/removemenu/{menu_id}': {
        get: {
            tags: ['Menu'],
            summary: 'update menu',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'menu_id',
                    required: true,
                    type: 'integer',
                    description: 'menu Id',
                },
            ],
            responses: {
                200: {
                    description: 'menu Update',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/menu/fetchmenudata/{menu_id}': {
        get: {
            tags: ['Menu'],
            summary: 'fetch menu data',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'menu_id',
                    required: true,
                    type: 'number',
                    description: 'add menu_id',
                },
            ],
            responses: {
                200: {
                    description: 'fetch menu items',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/menu/findrestaurant/{name}': {
        get: {
            tags: ['Menu'],
            summary: 'fetch menu item with restaurant name',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'name',
                    required: true,
                    type: 'string',
                    description: 'add restaurant name',
                },
            ],
            responses: {
                200: {
                    description: 'fetch menu item with restaurant name',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/menu/fetchmenubyrestaurant/{restaurant_id}': {
        get: {
            tags: ['Menu'],
            summary: 'fetch menu item with restaurant id',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'restaurant_id',
                    required: true,
                    type: 'string',
                    description: 'add restaurant id',
                },
            ],
            responses: {
                200: {
                    description: 'fetch menu item with restaurant id',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/menu/addbulkdata/{restaurant_id}': {
        post: {
            tags: ['Menu'],
            summary: 'add item bulk',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [{
                in: 'path',
                name: 'restaurant_id',
                required: true,
                type: 'string',
                description: 'add restaurant id',
            }],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                item_name: { type: 'string' },
                                price: { type: 'number' },
                            },
                            required: ['item_name', 'price',],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'fetch menu item with restaurant id',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
}
