const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const db = require('./models')
const app = require('./app')
const port = normalize(process.env.PORT || '9000')
const http = require('http')
const debug = require('debug')('outrage:server')

app.set('port', port)

var server = http.createServer(app)



db.sequelize.sync().then(function () {
    server.listen(port, function () {
        debug('Port is running' + server.address().port);
    });
    server.on('error', onError);
    server.on('listening', onListening);
});

function normalize(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + 'requires elevated privileges')
            process.exit(1)
            break;
        default:
            throw error;
    }
}



function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe' + addr :
        'port' + addr.port;
    debug('Listening on' + bind);
    console.log('Listening on port '+port)
}


  