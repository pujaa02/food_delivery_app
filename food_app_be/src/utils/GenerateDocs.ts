import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import _path from 'path';
import { BASE_URL_SERVER } from '../config/baseURL';
import _ from 'lodash';
import { Application } from 'express';
import { baseURLServertype, optionsSwaggerUIType, swaggerOptURLType, swaggerOptions } from '../common/types/swagger';

const { APP_NAME, NODE_ENV } = process.env;

const ENV = NODE_ENV || 'development';

const baseRoutes = _path.resolve('./docs/swagger/routes');
// const baseSchemas = _path.resolve('./docs/swagger/schemas')

const getPathRoutes = (path: string) => `${baseRoutes}${path}`;
// const getPathSchemes = (path) => `${baseSchemas}${path}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDocs = (basePath: string, getPath: any) => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require(getPath(`/${file}`));
    acc = {
      ...acc,
      ...data,
    };
    return acc;
  }, {});
};

const docsSources = getDocs(baseRoutes, getPathRoutes);
// const docsSchemes = getDocs(baseSchemas, getPathSchemes)

let baseURLServer: baseURLServertype = [];

if (ENV === 'development') {
  baseURLServer = [
    {
      url: `${BASE_URL_SERVER}/v1`,
      description: `${_.capitalize(ENV)} Server`,
    },
    {
      url: 'https://api-staging.example.com/v1',
      description: 'Staging Server',
    },
    {
      url: 'https://api.example.com/v1',
      description: 'Production Server',
    },
  ];
} else {
  baseURLServer = [
    {
      url: `${BASE_URL_SERVER}/v1`,
      description: `${_.capitalize(ENV)} Server`,
    },
  ];
}

export function generateDocs(app: Application) {
  const swaggerOptions: swaggerOptions = {
    definition: {
      openapi: '3.0.1',
      servers: baseURLServer,
      // security: [  //Set GLOBAL
      //   {
      //     auth_token: []
      //   }
      // ],
      components: {
        securitySchemes: {
          auth_token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'JWT Authorization header using the JWT scheme. Example: “Authorization: JWT {token}”',
          },
        },
        // schemas: docsSchemes,
        parameters: {
          page: {
            in: 'query',
            name: 'page',
            required: false,
            default: 0,
          },
          pageSize: {
            in: 'query',
            name: 'pageSize',
            required: false,
            default: 10,
          },
          filtered: {
            in: 'query',
            name: 'filtered',
            required: false,
            default: [],
            description: 'Example: [{"id": "nama", "value": "test"}]',
          },
          sorted: {
            in: 'query',
            name: 'sorted',
            required: false,
            default: [],
            description: 'Example: [{"id": "createdAt", "desc": true}]',
          },
        },
      },
      info: {
        title: `Api ${APP_NAME} Documentation`,
        version: '1.0.0',
      },
      paths: docsSources,
    },
    apis: [],
  };

  let swaggerOptURL: swaggerOptURLType = [];

  if (ENV === 'development') {
    swaggerOptURL = [
      {
        url: `${BASE_URL_SERVER}/v1/api-docs.json`,
        name: `${_.capitalize(ENV)} Server`,
      },
      {
        url: 'http://api-staging.example.com/v1/api-docs.json',
        name: 'Staging Server',
      },
      {
        url: 'http://api.example.com/v1/api-docs.json',
        name: 'Production Server',
      },
    ];
  } else {
    swaggerOptURL = [
      {
        url: `${BASE_URL_SERVER}/v1/api-docs.json`,
        name: `${_.capitalize(ENV)} Server`,
      },
    ];
  }

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  const optionsSwaggerUI: optionsSwaggerUIType = {
    explorer: true,
    swaggerOptions: {
      urls: swaggerOptURL,
    },
  };

  app.get('/v1/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/v1/api-docs', swaggerUI.serve);
  app.get('/v1/api-docs', swaggerUI.setup(swaggerSpec, optionsSwaggerUI));
}
