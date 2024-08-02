export type baseURLServertype = {
    url: string;
    description: string;
}[];

export type swaggerOptURLType = {
    url: string;
    name: string;
}[];

export interface swaggerOptions {
    definition: {
        openapi: string;
        servers: baseURLServertype;
        components: {
            securitySchemes: {
                auth_token: {
                    type: string;
                    in: string;
                    name: string;
                    description: string;
                };
            };
            parameters: parameters;
        };
        info: { title: string; version: string };
        // eslint-disable-next-line @typescript-eslint/ban-types
        paths: {};
    };
    apis: never[];
}

export interface parameters {
    page: subparameter;
    pageSize: subparameter;
    filtered: subparameter;
    sorted: subparameter;
}

export interface subparameter {
    in: string;
    name: string;
    required: boolean;
    default: number | [];
    description?: string;
}

export interface optionsSwaggerUIType {
    explorer: boolean;
    swaggerOptions: {
        urls: swaggerOptURLType;
    };
}

export interface urlClientServer {
    development: string;
    staging: string;
    production: string;
}
