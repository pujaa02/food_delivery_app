module.exports = {
    '/user/getalldata': {
        get: {
            tags: ['Users'],
            summary: 'Get All data',
            produces: ['json'],
            parameters: [],
            responses: {
                200: {
                    description: 'Get All data',
                },
            },
        },
    },
    '/user/delete/{user_id}': {
        get: {
            tags: ['Users'],
            summary: 'delete user',
            produces: ['json'],
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
                    description: 'delete user',
                },
            },
        },
    },

    '/user/update/{user_id}': {
        post: {
            tags: ['Users'],
            summary: 'update user',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
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
                                fname: { type: 'string' },
                                lname: { type: 'string' },
                                email: { type: 'string' },
                                phone: { type: 'string' },
                                gender: { type: 'string' },
                                bd: { type: 'Date' },
                                password: { type: 'string' },
                                role_id: { type: 'number' },
                                city: { type: 'string' },
                                state: { type: 'string' },
                                street: { type: 'string' },
                                pincode: { type: 'string' },
                            },
                            required: [],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'user Update',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
};
