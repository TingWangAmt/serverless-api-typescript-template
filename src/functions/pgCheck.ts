import AWS from 'aws-sdk';
import { Handler } from 'aws-lambda';
import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const sequelize = new Sequelize(

);

const hello: Handler = async(event, context, callback) => {
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
    };
  
    let response
    try {
      const userinfo = await sequelize.query('SELECT * FROM userinfo');
      response = {
        statusCode: 200,
        body: JSON.stringify({
          serverTimestamp: new Date().toISOString(),
          userinfo
        })
      }
    } catch (error) {
      console.error(error)
      response = {
        statusCode: 500,
        body: error.message
      }
    } finally {
      console.log('Closing database connection')
      await sequelize.close();
    }
    return response;
};

module.exports.list = hello;