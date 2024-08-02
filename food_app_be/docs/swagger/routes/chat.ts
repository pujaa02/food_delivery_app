module.exports = {
    '/chat/addchatdata': {
        post: {
            tags: ['Chat'],
            summary: 'Add chat details',
            produces: ['json'],
            parameters: [],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },

                            },
                            required: ['message'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Add chat details',
                },
            },
        },
    },
    '/chat/getchatdata': {
        get: {
            tags: ['Chat'],
            summary: 'get chat details',
            produces: ['json'],
            parameters: [],
            responses: {
                200: {
                    description: 'get chat details',
                },
            },
        },
    },


}
