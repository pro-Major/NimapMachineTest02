const redis = require('redis')
const client = redis.createClient(process.env.REDIS_PORT)

client.on('connect', function () {
    console.log("Connected with redis")
})

module.exports = client;