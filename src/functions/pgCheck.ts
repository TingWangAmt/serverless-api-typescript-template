import { Handler } from 'aws-lambda';
 import {Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    database:"test",
    host:"bopista-platform-postgresql.ceqbm7arub9o.ap-northeast-1.rds.amazonaws.com",
    port:5432,
    username:"postgres",
    password:"ozmHuRwoJ1qo65Qvaass",
    dialect:'postgres'
});

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
    }

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const response = {
            statusCode: 200,
            headers: responseHeaders,
            body: "postgre access successfully",
          };
        callback(null, response);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: responseHeaders,
            body: error.message,
        });
      }
};

module.exports.list = hello;