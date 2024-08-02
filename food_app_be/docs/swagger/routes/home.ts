module.exports = {
    '/home/findmenuall': {
        get: {
            tags: ['Menu'],
            summary: 'findmenu menu',
            produces: ['json'],
            responses: {
                200: {
                    description: 'findmenu menu',
                },
            },
        },
    },
    '/home/toprestaurant': {
        get: {
            tags: ['Rating'],
            summary: 'fetch greater than 3.5  rating restaurant wise',
            produces: ['json'],
            parameters: [],
            responses: {
                200: {
                    description: 'fetch  greater than 3.5  rating restaurant wise',
                },
            },
        },
    },
    '/home/fetchmenuitems/{item}': {
        get: {
            tags: ['Menu'],
            summary: 'fetch menu item',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'item',
                    required: true,
                    type: 'string',
                    description: 'add item name',
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
    '/home/getrestaurantallmenu/{id}': {
        get: {
            tags: ['Menu'],
            summary: 'fetch menu item',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    type: 'number',
                    description: 'add restaurant id',
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
}
