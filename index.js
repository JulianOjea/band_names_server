const express = require('express');
const path = require('path');
require('dotenv').config(); //lee el archivo .env y establece variables de entorno

//inicializar express
const app = express();

// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Path público
const publicPath = path.resolve(__dirname, 'public'); //apunta a donde está montado el servidor
app.use(express.static(publicPath));

    
//escucha en el puerto 3000
server.listen(process.env.PORT, (err) => { //callback que develve un error si sucede
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto ey :D!!', process.env.PORT); //si no hay ningún error se loguea esto
})