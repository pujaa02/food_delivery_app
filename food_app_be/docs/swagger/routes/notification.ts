module.exports = {
    '/notification/fetchnotification/{driver_id}': {
        get: {
            tags: ['Notification'],
            summary: 'fetch notification',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'driver_id',
                    required: true,
                    type: 'number',
                    description: 'add driver id',
                },
            ],
            responses: {
                200: {
                    description: 'fetch notifications',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/notification/showorderdata/{order_id}': {
        get: {
            tags: ['Notification'],
            summary: 'fetch order data',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'order_id',
                    required: true,
                    type: 'number',
                    description: 'add order id',
                },
            ],
            responses: {
                200: {
                    description: 'fetch order data',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
    '/notification/acceptorder/{driver_id}/{order_id}': {
        get: {
            tags: ['Notification'],
            summary: 'accept order',
            security: [
                {
                    auth_token: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'driver_id',
                    required: true,
                    type: 'number',
                    description: 'add driver id',
                },
                {
                    in: 'path',
                    name: 'order_id',
                    required: true,
                    type: 'number',
                    description: 'add order id',
                },
            ],
            responses: {
                200: {
                    description: 'accept order',
                },
                400: {
                    description: 'something went wrong',
                },
            },
        },
    },
}
