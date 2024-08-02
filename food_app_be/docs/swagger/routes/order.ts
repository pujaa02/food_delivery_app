module.exports = {
    '/order/addorder/{user_id}': {
        post: {
            tags: ['Order'],
            summary: 'Add order details',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user_id',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                menu_id: { type: 'number' },
                                total_item: { type: 'number' },

                            },
                            required: ['menu_id', 'total_item'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Add order details',
                },
            },
        },
    },
    '/order/cancelorder/{user_id}/{restaurant_id}/{order_id}': {
        get: {
            tags: ['Order'],
            summary: 'cancel order',
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
                {
                    in: 'path',
                    name: 'order_id',
                    required: true,
                    type: 'integer',
                    description: 'order Id',
                },
            ],
            responses: {
                200: {
                    description: 'cancel order',
                },
            },
        },
    },
    '/order/getorderdetail/{user_id}': {
        get: {
            tags: ['Order'],
            summary: 'Add order details',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    type: 'integer',
                    description: 'user_id',
                },
            ],
            responses: {
                200: {
                    description: 'Add order details',
                },
            },
        },
    },
    '/order/updateorderstatus/{order_id}': {
        get: {
            tags: ['Order'],
            summary: 'update order status',
            produces: ['json'],
            parameters: [
                {
                    in: 'path',
                    name: 'order_id',
                    required: true,
                    type: 'integer',
                    description: 'order_id',
                },
            ],
            responses: {
                200: {
                    description: 'update order status',
                },
            },
        },
    },
}


// getorderdetail/:order_id