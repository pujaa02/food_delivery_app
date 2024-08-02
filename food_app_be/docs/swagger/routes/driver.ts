module.exports = {
    '/driver/removedriver/{driver_id}': {
        get: {
            tags: ['Driver'],
            summary: 'delete driver',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'driver_id',
                    required: true,
                    type: 'integer',
                    description: 'driver Id',
                },
            ],
            responses: {
                200: {
                    description: 'delete driver',
                },
            },
        },
    },
    '/driver/fetchdriver/{user_id}': {
        get: {
            tags: ['Driver'],
            summary: 'fetch driver',
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
                    description: 'fetch driver',
                },
            },
        },
    },
    '/driver/fetchdashboarddata/{driver_id}': {
        get: {
            tags: ['Driver'],
            summary: 'fetch driver dashboard',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'driver_id',
                    required: true,
                    type: 'integer',
                    description: 'driver Id',
                },
            ],
            responses: {
                200: {
                    description: 'fetch driver dashboard',
                },
            },
        },
    },
};
