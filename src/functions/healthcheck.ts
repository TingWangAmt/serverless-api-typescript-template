
module.exports.healthcheck = async () => {
    return {
        body: 'OK',
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://master.d2w7htrom5yxv0.amplifyapp.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        statusCode: 200,
    };
}
