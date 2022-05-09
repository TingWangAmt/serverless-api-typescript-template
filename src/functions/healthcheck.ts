import type { ValidatedEventAPIGatewayProxyEvent } from '../libs/api-gateway';

const schema = {
    type: "object",
    properties: {
      name: { type: 'string' }
    },
    required: ['name']
  };

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> =  async (event) => {
    const origin = event.headers['origin'];
    const resOriginHeader = ["https://master.d2w7htrom5yxv0.amplifyapp.com", "http://localhost:3000"];
    const responseHeaders = {
        'Access-Control-Allow-Origin': '',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      };
    if (!!origin && resOriginHeader.includes(origin)) {
       responseHeaders['Access-Control-Allow-Origin'] = origin
    }
      return {
          body: 'OK',
          headers: responseHeaders,
          statusCode: 200,
      };
  }

module.exports.healthcheck = hello;
