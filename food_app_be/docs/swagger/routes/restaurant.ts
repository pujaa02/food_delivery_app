module.exports = {
    '/restaurant/addrestaurant/{user_id}': {
        post: {
            tags: ['Restaurant'],
            summary: 'Add Restaurant details',
            produces: ['json'],
            parameters: [{
                in: 'path',
                name: 'user_id',
                required: true,
                type: 'integer',
                description: 'restaurant Id',
            },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                phone: { type: 'string' },
                                address: { type: 'string' },
                            },
                            required: ['name', 'phone', 'address',],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Add Restaurant details',
                },
            },
        },
    },
    '/restaurant/removerestaurant/{restaurant_id}': {
        get: {
            tags: ['Restaurant'],
            summary: 'delete restaurant',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'restaurant_id',
                    required: true,
                    type: 'integer',
                    description: 'restaurant Id',
                },
            ],
            responses: {
                200: {
                    description: 'delete restaurant',
                },
            },
        },
    },

    '/restaurant/updaterestaurant/{restaurant_id}/{user_id}': {
        post: {
            tags: ['Restaurant'],
            summary: 'update restaurant',
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
                    type: 'integer',
                    description: 'restaurant Id',
                },
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user Id',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                phone: { type: 'string' },
                                address: { type: 'string' },
                            },
                            required: ['name', 'phone', 'address',],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'restaurant Update',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/restaurant/getrestaurantdata/{user_id}': {
        get: {
            tags: ['Restaurant'],
            summary: 'get restaurant data',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user Id',
                },
            ],
            responses: {
                200: {
                    description: 'get restaurant data',
                },
            },
        },
    },
}