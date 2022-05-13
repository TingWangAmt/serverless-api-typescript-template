import { Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const hello: Handler = (event, context, callback) => {
    const origin = event.headers['origin'];
    const resOriginHeader = ["https://master.d2w7htrom5yxv0.amplifyapp.com", "http://localhost:3000"];
    const responseHeaders = {
        'Access-Control-Allow-Origin': 'https://master.d2w7htrom5yxv0.amplifyapp.com',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      };
    if (!!origin && resOriginHeader.includes(origin)) {
       responseHeaders['Access-Control-Allow-Origin'] = origin
    }

    const params ={
      TableName: "test",
      Item: {name:Date.now().toString(), age:33}
    };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });

    dynamoDb.scan({
      TableName: "test1",
    }, (error, result) => {
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: error.message,
        });
        return;
      }

      // create a response
      const response = {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(result.Items),
      };
      callback(null, response);
    });
  }

module.exports.healthcheck = hello;
