module.exports = {
    '/cart/addtocart/{user_id}': {
        post: {
            tags: ['Cart'],
            summary: 'Get carts data',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user_id',
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', },
                                count: { type: 'number' },
                            },
                            required: ['count', 'id'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Get All carts',
                },
            },
        },
    },
    '/cart/getcarddata/{user_id}': {
        get: {
            tags: ['Cart'],
            summary: 'Get carts data by user_id',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user_id',
                }
            ],
            responses: {
                200: {
                    description: 'Get carts data by user_id',
                },
            },
        },
    },
    '/cart/removecartdata/{user_id}': {
        get: {
            tags: ['Cart'],
            summary: 'remove carts data by user_id',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user_id',
                }
            ],
            responses: {
                200: {
                    description: 'remove carts data by user_id',
                },
            },
        },
    },
};
