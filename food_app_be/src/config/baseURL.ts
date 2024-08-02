import { urlClientServer } from '../common/types/swagger';
import dotenv from "dotenv";
dotenv.config();


const URL_CLIENT: urlClientServer = {
    development: 'http://192.168.10.119:3000',
    staging: 'https://staging.example.com',
    production: 'https://example.com',
};

const URL_SERVER: urlClientServer = {
    development: `http://192.168.10.119:${process.env.PORT}`,
    staging: 'https://api-staging.example.com',
    production: 'https://api.example.com',
};

const ENV: string = process.env.NODE_ENV || 'development';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const BASE_URL_CLIENT: urlClientServer = URL_CLIENT[ENV];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const BASE_URL_SERVER: urlClientServer = URL_SERVER[ENV];

export { BASE_URL_CLIENT, BASE_URL_SERVER };
