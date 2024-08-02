module.exports = {
    '/admin/getuser/{page}/${search}': {
        get: {
            tags: ['Admin'],
            summary: 'fetch all user with pagination',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'page',
                    required: true,
                    type: 'number',
                    description: 'add page number',
                },
                {
                    in: 'path',
                    name: 'search',
                    type: 'string',
                    description: 'search option',
                },
            ],
            responses: {
                200: {
                    description: 'fetch all user with pagination',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/admin/getrestaurants/{page}/${search}': {
        get: {
            tags: ['Admin'],
            summary: 'fetch all restaurants with pagination',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'page',
                    required: true,
                    type: 'number',
                    description: 'add page number',
                },
                {
                    in: 'path',
                    name: 'search',
                    type: 'string',
                    description: 'search option',
                },
            ],
            responses: {
                200: {
                    description: 'fetch all restaurants with pagination',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/admin/getmenus/{page}/${search}': {
        get: {
            tags: ['Admin'],
            summary: 'fetch all menu with pagination',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'page',
                    required: true,
                    type: 'number',
                    description: 'add page number',
                },
                {
                    in: 'path',
                    name: 'search',
                    type: 'string',
                    description: 'search option',
                },
            ],
            responses: {
                200: {
                    description: 'fetch all menu with pagination',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/admin/getratings/{page}/${search}': {
        get: {
            tags: ['Admin'],
            summary: 'fetch all ratings with pagination',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'page',
                    required: true,
                    type: 'number',
                    description: 'add page number',
                },
                {
                    in: 'path',
                    name: 'search',
                    type: 'string',
                    description: 'search option',
                },
            ],
            responses: {
                200: {
                    description: 'fetch all ratings with pagination',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
}
