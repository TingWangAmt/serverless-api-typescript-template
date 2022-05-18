import { Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import authorizer from './authorizer';
import jsonwebtoken from 'jsonwebtoken';
import jose from 'node-jose';

const jwtRe = /(?<header>.+)\.(?<payload>.+)\.(?<signature>.+)/;

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

const hello: Handler = (event, context, callback) => {
    // const origin = event.headers['origin'];
    // const resOriginHeader = ["https://dev.d10apifivscxf5.amplifyapp.com", "https://master.d2w7htrom5yxv0.amplifyapp.com", "http://localhost:3000"];
    const responseHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      };

    const claims = event.requestContext.authorizer['claims'];

    // const sections  = token.split('.');
    // var payload = jose.util.base64url.decode(sections[1]);
    // payload = JSON.parse(payload.toString());
    const token = event.headers.Authorization;
    const auth = jsonwebtoken.decode(token);
         
        // 以下の要領で、ユーザープールの各項目を取得できる
        // console.log("Cognito User (username) : " + payload["cognito:username"]);
        // console.log("Cognito User (family_name) : " + payload["family_name"]);
        // console.log("Cognito User (given_name) : " + payload["given_name"]);
    // const claim = authorizer(token);
    // if (!!origin && resOriginHeader.includes(origin)) {
    //    responseHeaders['Access-Control-Allow-Origin'] = origin
    // }

    // const params ={
    //   TableName: "test",
    //   Item: {name:Date.now().toString(), age:33}
    // };

  // dynamoDb.put(params, (error) => {
  //   if (error) {
  //     console.error(error);
  //     callback(null, {
  //       statusCode: error.statusCode || 501,
  //       headers: responseHeaders,
  //       body: 'Couldn\'t create the todo item.',
  //     });
  //     return;
  //   }

  //   // create a response
  //   const response = {
  //     statusCode: 200,
  //     headers: responseHeaders,
  //     body: JSON.stringify(params.Item),
  //   };
  //   callback(null, response);
  // });

    // dynamoDb.scan({
    //   TableName: "test1",
    // }, (error, result) => {
    //   if (error) {
    //     console.error(error);
    //     callback(null, {
    //       statusCode: error.statusCode || 501,
    //       headers: responseHeaders,
    //       body: error.message,
    //     });
    //     return;
    //   }

    //   // create a response
      const response = {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify(claims),//JSON.stringify(result.Items)
      };
      callback(null, response);
    // });
  }

module.exports.healthcheck = hello;
