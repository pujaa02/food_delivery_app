

module.exports = {
    '/register': {
        post: {
            tags: ['login'],
            summary: 'Register',
            security: [
                {
                    auth_token: [],
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
                            required: ['fname', 'lname', 'email', 'phone', 'password', 'role_id',],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'user registerd',
                },
            },
        },
    },
    '/login': {
        post: {
            tags: ['login'],
            summary: 'login',
            security: [
                {
                    auth_token: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: { type: 'string' },
                                password: { type: 'string' },
                            },
                            required: ['email', 'password'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'login succesfully',
                },
            },
        },
    },
    '/logout': {
        get: {
            tags: ['login'],
            summary: 'logout',
            produces: ['application/json'],
            parameters: [],
            responses: {
                200: {
                    description: 'logout sucessfully',
                },
            },
        },
    },
    '/updatepass': {
        post: {
            tags: ['Users'],
            summary: 'find user',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: { type: 'string' },
                                password: { type: 'string' },
                            },
                            required: ["email", "password"],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'user exist',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/getLoggedIn': {
        post: {
            tags: ['Users'],
            summary: 'get all permission,role',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [],
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
                    description: 'all permission,role get successfully',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
}