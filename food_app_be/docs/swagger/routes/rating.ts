module.exports = {
    '/rating/addrating/{user_id}/{restaurant_id}': {
        post: {
            tags: ['Rating'],
            summary: 'Add rating and review',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user_id',
                },
                {
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
                                rating: { type: 'number' },
                                content: { type: 'string' },
                            },
                            required: ['rating', 'content',],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Add rating and review',
                },
            },
        },
    },
    '/rating/fetchrating': {
        get: {
            tags: ['Rating'],
            summary: 'fetch all rating restaurant wise',
            produces: ['json'],
            parameters: [],
            responses: {
                200: {
                    description: 'fetch all rating restaurant wise',
                },
            },
        },
    },
    // '/rating/toprestaurant': {
    //     get: {
    //         tags: ['Rating'],
    //         summary: 'fetch greater than 3.5  rating restaurant wise',
    //         produces: ['json'],
    //         parameters: [],
    //         responses: {
    //             200: {
    //                 description: 'fetch  greater than 3.5  rating restaurant wise',
    //             },
    //         },
    //     },
    // },
}
